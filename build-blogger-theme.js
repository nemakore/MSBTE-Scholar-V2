const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

async function buildTheme() {
  console.log('1. Reading compiled Tailwind CSS...');
  const cssDir = path.join(__dirname, 'out', '_next', 'static', 'css');
  let inlineCss = '';
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
    if (cssFiles.length > 0) {
      inlineCss = fs.readFileSync(path.join(cssDir, cssFiles[0]), 'utf8');
      console.log('   CSS loaded:', inlineCss.length, 'bytes');
    }
  }

  console.log('2. Reading pre-rendered HTML shell for Homepage from out/index.html...');
  const outHtmlPath = path.join(__dirname, 'out', 'index.html');
  let preRenderedBody = '';
  if (fs.existsSync(outHtmlPath)) {
    const html = fs.readFileSync(outHtmlPath, 'utf8');
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      preRenderedBody = bodyMatch[1].replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '');
      preRenderedBody = preRenderedBody.replace(/<(meta|link|input|img|br|hr)([^>]*?)(?<!\/)>/gi, '<$1$2/>');
      console.log('   Pre-rendered body extracted:', preRenderedBody.length, 'bytes');
    }
  }

  console.log('3. Reading extracted MSBTE Syllabus & WhatsApp Community data...');
  const syllabusPath = path.join(__dirname, 'blogger-theme', 'msbte-syllabus-data.js');
  let syllabusJs = '';
  if (fs.existsSync(syllabusPath)) {
    syllabusJs = fs.readFileSync(syllabusPath, 'utf8');
    console.log('   Syllabus data loaded:', syllabusJs.length, 'bytes');
  }

  console.log('4. Bundling React app with live Blogger CMS Sync...');
  const esbuildResult = await esbuild.build({
    entryPoints: [path.join(__dirname, 'src', 'entry.tsx')],
    bundle: true,
    minify: true,
    write: false,
    format: 'iife',
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  });

  let bundleJs = esbuildResult.outputFiles[0].text;
  bundleJs = bundleJs.replace(/\]\]>/g, ']]\\x3E');
  console.log('   Bundle JS generated:', bundleJs.length, 'bytes');

  console.log('5. Generating Ultimate Hybrid Blogger Theme XML...');

  const commentIncludables = `
        <b:includable id='comments' var='post'>
          <section class='comments threaded' expr:data-embed='data:post.embedCommentForm' expr:data-num-comments='data:post.numberOfComments' id='comments'>
            <b:class cond='data:post.numberOfComments != 0' name='has-comments'/>
            <b:class cond='data:post.numberOfComments == 0' name='no-comments'/>
            <a name='comments'/>
            <b:if cond='data:post.embedCommentForm'>
              <b:include name='commentsTitle'/>
              <b:if cond='data:post.numberOfComments != 0'>
                <div class='comments-content'>
                  <div id='comment-holder'>
                    <data:post.commentHtml/>
                  </div>
                </div>
              </b:if>
              <b:if cond='data:post.allowNewComments'>
                <b:include data='post' name='commentForm'/>
              </b:if>
              <b:else/>
              <p class='comments-message'>Please Select Embedded Mode To show the Comment System.<em>*</em></p>
            </b:if>
          </section>
        </b:includable>

        <b:includable id='commentsTitle'>
          <h3 class='comments-title text-lg font-bold text-[#0B3B2E] mb-3'>
            <b:if cond='data:post.numberOfComments == 0'>
              💬 0 Comments • Be the first to share your doubt or feedback
              <b:else/>
              <b:if cond='data:post.numberOfComments == 1'>
                💬 1 Comment
                <b:else/>
                💬 <data:post.numberOfComments/> Comments
              </b:if>
            </b:if>
          </h3>
        </b:includable>

        <b:includable id='commentForm' var='post'>
          <div class='comment-form bg-[#FAF6EE] border border-[#E6DCC6] rounded-2xl p-4 mt-4'>
            <a name='comment-form'/>
            <b:include data='post' name='commentFormIframeSrc'/>
            <iframe allowtransparency='allowtransparency' class='blogger-iframe-colorize blogger-comment-from-post rounded-xl' frameborder='0' id='comment-editor' name='comment-editor' src='' style='min-height:160px;' width='100%'/>
            <data:post.cmtfpIframe/>
            <script type='text/javascript'>
              BLOG_CMT_createIframe(&#39;<data:post.appRpcRelayPath/>&#39;);
            </script>
          </div>
        </b:includable>

        <b:includable id='commentFormIframeSrc' var='post'>
          <a expr:href='data:post.commentFormIframeSrc' id='comment-editor-src'/>
        </b:includable>

        <b:includable id='threadedComments' var='post'>
          <section class='comments threaded' expr:data-embed='data:post.embedCommentForm' expr:data-num-comments='data:post.numberOfComments' id='comments'>
            <a name='comments'/>
            <div class='comments-content'>
              <b:if cond='data:post.embedCommentForm'>
                <b:include data='post' name='threadedCommentJs'/>
              </b:if>
              <div id='comment-holder'>
                <data:post.commentHtml/>
              </div>
            </div>
            <p class='comment-footer'>
              <b:if cond='data:post.allowNewComments'>
                <b:include data='post' name='threadedCommentForm'/>
                <b:else/>
                <data:post.noNewCommentsText/>
              </b:if>
            </p>
            <b:if cond='data:showCmtPopup'>
              <div id='comment-popup'>
                <iframe allowtransparency='allowtransparency' frameborder='0' id='comment-actions' name='comment-actions' scrolling='no'/>
              </div>
            </b:if>
          </section>
        </b:includable>

        <b:includable id='threadedCommentForm' var='post'>
          <div class='comment-form bg-[#FAF6EE] border border-[#E6DCC6] rounded-2xl p-4 mt-4'>
            <a name='comment-form'/>
            <b:include data='post' name='commentFormIframeSrc'/>
            <iframe allowtransparency='allowtransparency' class='blogger-iframe-colorize blogger-comment-from-post' expr:height='data:cmtIframeInitialHeight ?: &quot;120px&quot;' frameborder='0' id='comment-editor' name='comment-editor' src='' width='100%'/>
            <data:post.cmtfpIframe/>
            <script type='text/javascript'>
              BLOG_CMT_createIframe(&#39;<data:post.appRpcRelayPath/>&#39;);
            </script>
          </div>
        </b:includable>

        <b:includable id='threadedCommentJs' var='post'>
          <script async='async' expr:src='data:post.commentSrc' type='text/javascript'/>
          <b:template-script async='true' name='threadedcomments'/>
          <script type='text/javascript'>
            blogger.widgets.blog.initThreadedComments(
                <data:post.commentJso/>,
                <data:post.commentMsgs/>,
                <data:post.commentConfig/>);
          </script>
        </b:includable>

        <b:includable id='commentList' var='comments'>
          <div class='comments-content space-y-3'>
            <b:loop values='data:comments' var='comment'>
              <b:include data='comment' name='commentItem'/>
            </b:loop>
          </div>
        </b:includable>

        <b:includable id='commentItem' var='comment'>
          <div class='comment p-4 rounded-xl bg-white border border-[#E6DCC6] shadow-sm' expr:id='&quot;c&quot; + data:comment.id'>
            <div class='comment-block'>
              <div class='comment-header flex items-center justify-between border-b border-[#FAF6EE] pb-2 mb-2'>
                <span class='user font-bold text-sm text-[#0B3B2E]'><data:comment.author/></span>
                <span class='datetime text-xs text-[#5F5B52]'><data:comment.timestamp/></span>
              </div>
              <p class='comment-content text-sm text-[#262626] leading-relaxed'><data:comment.body/></p>
            </div>
          </div>
        </b:includable>`;

  const themeXml = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsVersion='3' b:responsive='true' expr:class='data:blog.languageDirection' expr:dir='data:blog.languageDirection' expr:lang='data:blog.localeUnderscoreDelimited' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
  <head>
    <meta charset='utf-8'/>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no' name='viewport'/>
    <title><data:view.title.escaped/> | MSBTE Scholar 2.0</title>
    
    <!-- Google tag (gtag.js) -->
    <script async='async' src='https://www.googletagmanager.com/gtag/js?id=G-6K2PBC4GW2'></script>
    <script>
    //<![CDATA[
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-6K2PBC4GW2');

      window.addEventListener('appinstalled', () => {
        gtag('event', 'pwa_installed', { event_category: 'PWA', event_label: 'App Installed' });
      });
      if (window.matchMedia('(display-mode: standalone)').matches) {
        gtag('event', 'pwa_opened', { event_category: 'PWA', event_label: 'Standalone Opened' });
      }
    //]]>
    </script>
    
    <!-- Google Site Verification -->
    <meta content='y6iJNxuK9MEu738Y0uFUXLc8hzxxIP2D_hXYdALHdts' name='google-site-verification'/>
    
    <!-- SEO & Metadata -->
    <meta expr:content='data:view.description.escaped ?: "MSBTE Scholar 2.0 - Premier educational platform for Maharashtra State Board of Technical Education diploma students. Solved manuals, notes, model question papers, capstone projects, and syllabus for K-Scheme."' name='description'/>
    <meta content='#062D24' name='theme-color'/>
    <meta content='yes' name='mobile-web-app-capable'/>
    <meta content='yes' name='apple-mobile-web-app-capable'/>
    <meta content='black-translucent' name='apple-mobile-web-app-status-bar-style'/>
    <meta content='MSBTE Scholar 2.0' name='apple-mobile-web-app-title'/>
    
    <!-- PWA Icons & Manifest -->
    <link href='https://cdn.jsdelivr.net/gh/nemakore/blogger-pwa@main/bucket/app/icons/favicon-16x16.png' rel='icon' sizes='16x16' type='image/png'/>
    <link href='https://cdn.jsdelivr.net/gh/nemakore/blogger-pwa@main/bucket/app/icons/favicon-32x32.png' rel='icon' sizes='32x32' type='image/png'/>
    <link href='https://cdn.jsdelivr.net/gh/nemakore/blogger-pwa@main/bucket/app/icons/apple-touch-icon-180x180.png' rel='apple-touch-icon' sizes='180x180'/>
    <link href='https://cdn.jsdelivr.net/gh/nemakore/blogger-pwa@main/bucket/app/manifest.cdn.webmanifest' rel='manifest'/>
    
    <b:include data='blog' name='all-head-content'/>

    <!-- CDNs & Preconnects -->
    <link href='https://api.dicebear.com' rel='preconnect'/>
    <link href='https://images.unsplash.com' rel='preconnect'/>
    <link href='https://cdnjs.cloudflare.com' rel='preconnect'/>
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' rel='stylesheet'/>

    <!-- Clean URLs Script: Automatically removes ?m=1, &m=1, %3D from Blogger URLs -->
    <script type='text/javascript'>
    //<![CDATA[
      (function() {
        var uri = window.location.toString();
        if (uri.indexOf("%3D") > 0 || uri.indexOf("?m=1") > 0 || uri.indexOf("&m=1") > 0) {
          var clean = uri.replace(/[?&]m=1/, '').replace(/%3D/g, '');
          window.history.replaceState({}, document.title, clean);
        }
      })();
    //]]>
    </script>

    <!-- Inlined Tailwind CSS & Comprehensive Design System -->
    <b:skin><![CDATA[
/* Reset Blogger Default Layout */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  background-color: #FAF6EE;
  color: #141414;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  overflow-x: hidden;
}

#main.no-items, .no-items.section, .no-items {
  display: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Base Tailwind & Design System Tokens */
${inlineCss}

/* CMS Article Typography & Layout */
.cms-article-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 1rem 4rem 1rem;
}
.cms-article-card {
  background: #ffffff;
  border: 1px solid #E6DCC6;
  border-radius: 1.5rem;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
}
@media (min-width: 640px) {
  .cms-article-card {
    padding: 2.5rem;
  }
}
.post-body {
  font-size: 15px;
  line-height: 1.85;
  color: #262626;
  word-break: break-word;
}
.post-body h1, .post-body h2, .post-body h3, .post-body h4 {
  color: #0B3B2E;
  font-weight: 800;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}
.post-body h2 {
  font-size: 1.45rem;
  border-bottom: 2px solid #E6DCC6;
  padding-bottom: 0.5rem;
}
.post-body h3 { font-size: 1.2rem; }
.post-body p { margin-bottom: 1.25rem; }
.post-body a {
  color: #0B3B2E;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.15s;
}
.post-body a:hover { color: #D4AF37; }
.post-body img {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  margin: 1.5rem auto;
  display: block;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
}
.post-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.post-body th, .post-body td {
  padding: 0.75rem 1rem;
  border: 1px solid #E6DCC6;
  text-align: left;
  font-size: 0.875rem;
}
.post-body th {
  background-color: #0B3B2E;
  color: white;
  font-weight: 700;
}
.post-body tr:nth-child(even) { background-color: #FAF6EE; }
.post-body blockquote {
  border-left: 4px solid #D4AF37;
  padding: 0.75rem 1.25rem;
  background: #FAF6EE;
  border-radius: 0 0.75rem 0.75rem 0;
  font-style: italic;
  margin: 1.5rem 0;
}
.post-body pre, .post-body code {
  background: #062D24;
  color: #F1DFA4;
  padding: 0.2rem 0.4rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: monospace;
}
.post-body pre {
  padding: 1rem;
  overflow-x: auto;
  border-radius: 0.75rem;
  margin: 1.5rem 0;
}
.post-body pre code {
  padding: 0;
  background: transparent;
}
.post-body .download-btn, .post-body .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #0B3B2E 0%, #062D24 100%);
  color: #FAF6EE !important;
  font-weight: 700;
  border-radius: 0.75rem;
  text-decoration: none !important;
  box-shadow: 0 4px 14px rgba(11, 59, 46, 0.25);
  margin: 0.5rem 0;
  transition: transform 0.2s;
}
.post-body .download-btn:hover, .post-body .btn:hover {
  transform: translateY(-2px);
}

/* PWA Overlay & Modal */
.pwa-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 29, 23, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}
.pwa-overlay.show {
  opacity: 1;
  visibility: visible;
}
.pwa-modal {
  background: #FAF6EE;
  border: 1px solid #E6DCC6;
  width: 90%;
  max-width: 360px;
  padding: 24px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
}
.pwa-modal img {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  margin: 0 auto 12px;
  box-shadow: 0 4px 12px rgba(11,59,46,0.2);
}
.pwa-modal h3 {
  margin: 6px 0;
  font-size: 19px;
  font-weight: 800;
  color: #0B3B2E;
}
.pwa-modal p {
  font-size: 13px;
  color: #5F5B52;
  margin-bottom: 20px;
}
.pwa-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.pwa-actions button {
  border: none;
  padding: 10px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  transition: transform 0.15s;
}
.pwa-actions .install-btn {
  background: #0B3B2E;
  color: #FAF6EE;
  box-shadow: 0 4px 12px rgba(11,59,46,0.3);
}
.pwa-actions .later-btn {
  background: #E6DCC6;
  color: #5F5B52;
}

/* Floating PWA Install Button */
.pwa-button {
  position: fixed;
  bottom: 85px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #D4AF37;
  background: #062D24;
  color: #D4AF37;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 999;
  box-shadow: 0 6px 20px rgba(6,45,36,0.4);
  cursor: pointer;
  transition: transform 0.2s;
}
.pwa-button:hover {
  transform: scale(1.08);
}
.pwa-button svg {
  width: 24px;
  height: 24px;
  stroke: #D4AF37;
}

/* Anti-Inspect / Security Alert Popup */
.popup-alert {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100000;
  background: #fff;
  border: 2px solid #d8000c;
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(216, 0, 12, 0.25);
  color: #d8000c;
  text-align: center;
  max-width: 90%;
  width: 360px;
}
.popup-alert.show {
  display: block;
  animation: fadeIn 0.25s ease-in-out;
}
.popup-alert-icon { font-size: 40px; margin-bottom: 8px; }
.popup-alert-title { font-size: 18px; font-weight: 800; margin-bottom: 8px; }
.popup-alert-message { font-size: 13px; line-height: 1.5; color: #333; }

/* Syllabus Modal */
#syllabusModal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(4, 29, 23, 0.7);
  backdrop-filter: blur(4px);
  justify-content: center;
  align-items: center;
  z-index: 99998;
}
#syllabusModal .modal-content {
  background: #FAF6EE;
  border: 1px solid #E6DCC6;
  padding: 24px;
  border-radius: 20px;
  width: 92%;
  max-width: 440px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  text-align: left;
}
#syllabusModal select {
  width: 100%;
  padding: 12px;
  margin: 8px 0 16px 0;
  font-size: 13px;
  border-radius: 12px;
  border: 1px solid #E6DCC6;
  background: #fff;
  color: #141414;
  font-weight: 600;
  outline: none;
}
#syllabusModal select:focus {
  border-color: #0B3B2E;
}
#syllabusModal button {
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: 0.15s;
}
#syllabusModal .primary {
  background: #0B3B2E;
  color: #FAF6EE;
  flex: 1;
}
#syllabusModal .secondary {
  background: #E6DCC6;
  color: #5F5B52;
}

/* Branch Grid Cards */
.branch-grid-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.branch-grid-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(11, 59, 46, 0.12);
}
    ]]></b:skin>
  </head>
  <body class='bg-[#FAF6EE] text-[#141414] antialiased selection:bg-[#D4AF37]/30 selection:text-[#062D24]'>

    <!-- ============================================================== -->
    <!-- BLOGGER DASHBOARD "LAYOUT (लेआउट)" SECTIONS                     -->
    <!-- These sections are visible in Blogger Layout tab for easy edits -->
    <!-- ============================================================== -->

    <!-- SECTION 1: HEADER & LOGO -->
    <b:section id='header-logo' maxwidgets='1' name='Header (Logo &amp; Brand Title)' showaddelement='no'>
      <b:widget id='Header1' locked='true' title='MSBTE Scholar (Header)' type='Header' version='2' visible='true'>
        <b:widget-settings>
          <b:widget-setting name='displayUrl'>https://blogger.googleusercontent.com/img/a/AVvXsEhvzTp36KxYYd1y3fxFcbO0Xp9uqWs_dMdj1F13IOOVxAhkpIJW8Nv_FFQXc6IWcS6cCgl-oZKgGf6zi4fU4ZbjVhTAYKSDw969ckGWsl-Fh8LGyPB0tvL-5jjvv6WkAjWbQohQhKp4e6_5ux0kKzuONU2a9If7eBLuAJYR57FXS_W-JxIH95iCXZBpc0o=s294</b:widget-setting>
          <b:widget-setting name='displayHeight'>67</b:widget-setting>
          <b:widget-setting name='sectionWidth'>150</b:widget-setting>
          <b:widget-setting name='useImage'>true</b:widget-setting>
          <b:widget-setting name='shrinkToFit'>false</b:widget-setting>
          <b:widget-setting name='imagePlacement'>REPLACE</b:widget-setting>
          <b:widget-setting name='displayWidth'>294</b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <!-- Header widget data used dynamically in layout -->
        </b:includable>
      </b:widget>
    </b:section>

    <!-- SECTION 2: MAIN NAVIGATION MENU -->
    <b:section id='nav-menu' maxwidgets='1' name='Main Navigation Menu (Branches &amp; Links)' showaddelement='no'>
      <b:widget id='LinkList56' locked='true' title='Main Menu' type='LinkList' version='2' visible='true'>
        <b:widget-settings>
          <b:widget-setting name='sorting'>NONE</b:widget-setting>
          <b:widget-setting name='text-0'>Computer Engineering</b:widget-setting>
          <b:widget-setting name='link-0'>/#notes</b:widget-setting>
          <b:widget-setting name='text-1'>Electronics Engineering</b:widget-setting>
          <b:widget-setting name='link-1'>/#notes</b:widget-setting>
          <b:widget-setting name='text-2'>Civil Engineering</b:widget-setting>
          <b:widget-setting name='link-2'>/#notes</b:widget-setting>
          <b:widget-setting name='text-3'>Mechanical Engineering</b:widget-setting>
          <b:widget-setting name='link-3'>/#notes</b:widget-setting>
          <b:widget-setting name='text-4'>Question Papers</b:widget-setting>
          <b:widget-setting name='link-4'>/#pyqs</b:widget-setting>
          <b:widget-setting name='text-5'>Micro-Projects</b:widget-setting>
          <b:widget-setting name='link-5'>/#projects</b:widget-setting>
          <b:widget-setting name='text-6'>Online Mock Tests</b:widget-setting>
          <b:widget-setting name='link-6'>/#mock-tests</b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <!-- Main Menu Links -->
        </b:includable>
      </b:widget>
    </b:section>

    <!-- SECTION 3: TOP BANNER / ANNOUNCEMENTS -->
    <b:section id='top-banner-ads' maxwidgets='2' name='Top Banner / Ads / Notice' showaddelement='yes'>
      <b:widget id='HTML7' locked='false' title='Top Announcement Banner' type='HTML' version='2' visible='true'>
        <b:widget-settings>
          <b:widget-setting name='content'><![CDATA[<div class="p-3 rounded-2xl bg-gradient-to-r from-[#0B3B2E] to-[#041D17] text-[#FAF6EE] flex items-center justify-between text-xs sm:text-sm font-semibold shadow-md">
  <div class="flex items-center gap-2">
    <span class="text-lg">📢</span>
    <span>Join our official MSBTE Polytechnic WhatsApp Community for instant study alerts!</span>
  </div>
  <a href="https://chat.whatsapp.com/K6roXGbgAsFLSV1vdhZEQM" target="_blank" class="px-3 py-1.5 rounded-xl bg-[#25D366] text-white font-bold hover:opacity-95 whitespace-nowrap">Join Group</a>
</div>]]></b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <b:if cond='data:view.isSingleItem'>
            <div class='mb-6 max-w-[1100px] mx-auto px-4'>
              <data:content/>
            </div>
          </b:if>
        </b:includable>
      </b:widget>
    </b:section>

    <!-- SECTION 4: FEATURED BRANCH CARDS (K2 Grid Style) -->
    <b:section id='featured-branches' maxwidgets='4' name='Branch Shortcuts Grid' showaddelement='yes'>
      <b:widget id='HTML10' locked='true' title='Branch Quick Access' type='HTML' version='2' visible='true'>
        <b:widget-settings>
          <b:widget-setting name='content'><![CDATA[<!-- Dynamic Branch Grid -->]]></b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <!-- Handled inside interactive app and post sidebar -->
        </b:includable>
      </b:widget>
    </b:section>

    <!-- ============================================================== -->
    <!-- CASE 1: HOMEPAGE / PORTAL VIEW                                 -->
    <!-- Renders the full MSBTE Scholar 2.0 interactive SPA (13 Pages)  -->
    <!-- ============================================================== -->
    <b:if cond='!data:view.isSingleItem'>
      <div id='msbte-app-root'>
        ${preRenderedBody}
      </div>
      <!-- React 18 Engine for Homepage -->
      <script type='text/javascript'>
//<![CDATA[
${bundleJs}
//]]>
      </script>
    </b:if>

    <!-- ============================================================== -->
    <!-- CASE 2: SINGLE POST & CMS ARTICLES                             -->
    <!-- Renders Blog1 with breadcrumbs, author, share, and comments   -->
    <!-- ============================================================== -->
    <b:section id='main' name='Main Blog Posts' showaddelement='no'>
      <b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog' version='2'>
        
        <b:includable id='main' var='this'>
          <b:if cond='data:view.isSingleItem'>
            <div class='min-h-screen bg-[#FAF6EE] flex flex-col'>
              <!-- Sticky Brand Navigation Header -->
              <header class='h-16 bg-[#062D24] text-[#FAF6EE] border-b border-[#0B3B2E] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-md'>
                <a href='/' class='flex items-center gap-2.5 text-white font-bold no-underline hover:opacity-90'>
                  <div class='w-8 h-8 rounded-xl bg-gradient-to-br from-[#0B3B2E] to-[#041D17] border border-[#D4AF37] flex items-center justify-center shadow-sm'>
                    <span class='text-sm font-black text-[#D4AF37]'>MS</span>
                  </div>
                  <span class='text-base font-black tracking-tight'>MSBTE Scholar <span class='text-[#D4AF37]'>2.0</span></span>
                </a>

                <div class='flex items-center gap-2 sm:gap-3 text-xs font-bold'>
                  <a href='/' class='px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5'>
                    <span>🏠 Home</span>
                  </a>
                  <button onclick='openSyllabusModal()' class='px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF6EE] transition-colors flex items-center gap-1.5 cursor-pointer'>
                    <span>📚 Syllabus / WA</span>
                  </button>
                  <a href='/#study' class='px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:flex items-center gap-1.5'>
                    <span>📖 Study Notes</span>
                  </a>
                  <a href='/#jobs' class='px-3 py-1.5 rounded-xl bg-[#D4AF37] text-[#062D24] font-black hover:bg-[#c29e2e] transition-colors flex items-center gap-1.5'>
                    <span>💼 Jobs</span>
                  </a>
                </div>
              </header>

              <!-- Main Article Content Area with 2-Column Desktop Grid -->
              <div class='cms-article-container flex-1 w-full'>
                <div class='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
                  
                  <!-- Left: Article Column (8 cols) -->
                  <main class='lg:col-span-8'>
                    <b:loop values='data:posts' var='post'>
                      <article class='cms-article-card space-y-6'>
                        <!-- Breadcrumbs -->
                        <nav class='flex items-center gap-2 text-xs font-semibold text-[#5F5B52] flex-wrap'>
                          <a href='/' class='hover:text-[#0B3B2E]'>Home</a>
                          <span>/</span>
                          <b:if cond='data:post.labels'>
                            <a expr:href='data:post.labels.first.url' class='text-[#0B3B2E] hover:underline'><data:post.labels.first.name/></a>
                            <span>/</span>
                          </b:if>
                          <span class='text-[#141414] font-bold truncate max-w-xs'><data:post.title/></span>
                        </nav>

                        <!-- Article Title & Meta -->
                        <div class='space-y-3 border-b border-[#E6DCC6] pb-5'>
                          <b:if cond='data:post.labels'>
                            <div class='flex flex-wrap gap-2'>
                              <b:loop values='data:post.labels' var='label'>
                                <span class='px-2.5 py-0.5 rounded-full bg-[#E7F2EE] border border-[#0B3B2E]/20 text-[#0B3B2E] text-[11px] font-bold'>
                                  <data:label.name/>
                                </span>
                              </b:loop>
                            </div>
                          </b:if>
                          
                          <h1 class='text-2xl sm:text-3xl font-black text-[#0B3B2E] tracking-tight leading-snug'>
                            <data:post.title/>
                          </h1>

                          <div class='flex items-center gap-4 text-xs text-[#5F5B52] flex-wrap'>
                            <span>📅 <data:post.date/></span>
                            <span>✍️ <data:post.author.name/></span>
                            <span>💬 <data:post.numberOfComments/> Comments</span>
                            <span class='px-2 py-0.5 rounded-md bg-[#FAF6EE] border border-[#E6DCC6] text-[10px] font-bold text-[#0B3B2E]'>K-Scheme Verified</span>
                          </div>
                        </div>

                        <!-- Post Content Body (from Blogger Post Editor) -->
                        <div class='post-body'>
                          <data:post.body/>
                        </div>

                        <!-- WhatsApp Community CTA inside post -->
                        <div class='p-4 rounded-2xl bg-gradient-to-br from-[#062D24] to-[#041D17] text-[#FAF6EE] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4'>
                          <div class='space-y-1 text-center sm:text-left'>
                            <div class='text-sm font-black text-[#D4AF37]'>🎯 Join MSBTE Subject WhatsApp Group</div>
                            <p class='text-xs text-[#FAF6EE]/80'>Get real-time question paper updates, manual answers, and model papers for this subject.</p>
                          </div>
                          <button onclick='openSyllabusModal()' class='px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:opacity-95 shadow-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer'>
                            <span>📲 Find My Subject Group</span>
                          </button>
                        </div>

                        <!-- Social Share Action Bar -->
                        <div class='pt-6 border-t border-[#E6DCC6] flex flex-wrap items-center justify-between gap-4'>
                          <a href='/' class='px-4 py-2 rounded-xl bg-[#FAF6EE] hover:bg-[#E6DCC6] border border-[#E6DCC6] text-xs font-bold text-[#0B3B2E] transition-colors flex items-center gap-1.5'>
                            <span>← Back to Dashboard</span>
                          </a>
                          
                          <div class='flex items-center gap-2 flex-wrap'>
                            <a expr:href='&quot;https://api.whatsapp.com/send?text=&quot; + data:post.title + &quot; - &quot; + data:post.url' target='_blank' class='px-3.5 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center gap-1.5 hover:opacity-90 shadow-sm'>
                              <span>Share WhatsApp</span>
                            </a>
                            <a expr:href='&quot;https://t.me/share/url?url=&quot; + data:post.url + &quot;&amp;text=&quot; + data:post.title' target='_blank' class='px-3.5 py-2 rounded-xl bg-[#0088cc] text-white text-xs font-bold flex items-center gap-1.5 hover:opacity-90 shadow-sm'>
                              <span>Telegram</span>
                            </a>
                          </div>
                        </div>

                        <!-- Comments Section -->
                        <b:if cond='data:post.allowComments'>
                          <div class='pt-6'>
                            <b:include data='post' name='comments'/>
                          </div>
                        </b:if>
                      </article>
                    </b:loop>
                  </main>

                  <!-- Right: Sidebar Column (4 cols) -->
                  <aside class='lg:col-span-4 space-y-6'>
                    <!-- Branch Selector Card -->
                    <div class='p-5 rounded-2xl bg-white border border-[#E6DCC6] shadow-sm space-y-3'>
                      <div class='text-sm font-black text-[#0B3B2E] flex items-center gap-2'>
                        <span>📂</span>
                        <span>MSBTE Branches</span>
                      </div>
                      <div class='grid grid-cols-2 gap-2 text-xs font-bold'>
                        <a href='/#notes' class='p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E6DCC6] hover:border-[#0B3B2E] text-center text-[#0B3B2E]'>💻 Computer (CO)</a>
                        <a href='/#notes' class='p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E6DCC6] hover:border-[#0B3B2E] text-center text-[#0B3B2E]'>⚙️ Mechanical (ME)</a>
                        <a href='/#notes' class='p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E6DCC6] hover:border-[#0B3B2E] text-center text-[#0B3B2E]'>🏗️ Civil (CE)</a>
                        <a href='/#notes' class='p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E6DCC6] hover:border-[#0B3B2E] text-center text-[#0B3B2E]'>⚡ Electrical (EE)</a>
                        <a href='/#notes' class='p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E6DCC6] hover:border-[#0B3B2E] text-center text-[#0B3B2E]'>📡 ENTC (ETC)</a>
                        <a href='/#notes' class='p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E6DCC6] hover:border-[#0B3B2E] text-center text-[#0B3B2E]'>🤖 AI &amp; ML (AIML)</a>
                      </div>
                      <button onclick='openSyllabusModal()' class='w-full py-2.5 rounded-xl bg-[#0B3B2E] text-[#FAF6EE] text-xs font-bold hover:bg-[#062D24] transition-colors cursor-pointer'>
                        🔍 Search Branch Syllabus
                      </button>
                    </div>

                    <!-- Social Media Links -->
                    <div class='p-5 rounded-2xl bg-white border border-[#E6DCC6] shadow-sm space-y-3'>
                      <div class='text-sm font-black text-[#0B3B2E] flex items-center gap-2'>
                        <span>🤝</span>
                        <span>Join MSBTE Communities</span>
                      </div>
                      <div class='space-y-2 text-xs font-bold'>
                        <a href='https://chat.whatsapp.com/K6roXGbgAsFLSV1vdhZEQM' target='_blank' class='flex items-center justify-between p-2.5 rounded-xl bg-[#E7F2EE] border border-[#25D366]/30 text-[#0B3B2E] hover:bg-[#25D366] hover:text-white transition-colors'>
                          <span class='flex items-center gap-2'><span>💬</span> WhatsApp Main Group</span>
                          <span>Join →</span>
                        </a>
                        <a href='https://t.me/msbtescholar' target='_blank' class='flex items-center justify-between p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E6DCC6] text-[#0B3B2E] hover:bg-[#0088cc] hover:text-white transition-colors'>
                          <span class='flex items-center gap-2'><span>✈️</span> Telegram Channel</span>
                          <span>Join →</span>
                        </a>
                        <a href='https://github.com/msbtescholar' target='_blank' class='flex items-center justify-between p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E6DCC6] text-[#0B3B2E] hover:bg-[#141414] hover:text-white transition-colors'>
                          <span class='flex items-center gap-2'><span>🐙</span> GitHub Open Source</span>
                          <span>View →</span>
                        </a>
                      </div>
                    </div>

                    <!-- Fast Tools -->
                    <div class='p-5 rounded-2xl bg-gradient-to-br from-[#0B3B2E] to-[#041D17] text-[#FAF6EE] shadow-sm space-y-2.5'>
                      <div class='text-sm font-black text-[#D4AF37]'>⚡ Polytechnic Quick Tools</div>
                      <p class='text-xs text-[#FAF6EE]/80 leading-relaxed'>Access semester percentage calculator, K-Scheme marks estimator, and MSBTE Hall Ticket checker.</p>
                      <a href='/#cgpa' class='inline-block w-full text-center py-2 rounded-xl bg-[#D4AF37] text-[#062D24] text-xs font-black hover:bg-[#c29e2e] transition-colors'>
                        Open CGPA Calculator
                      </a>
                    </div>
                  </aside>

                </div>
              </div>

              <!-- Footer -->
              <footer class='bg-[#041D17] text-[#FAF6EE]/80 py-8 px-6 text-center text-xs border-t border-[#0B3B2E] mt-12'>
                <div class='max-w-4xl mx-auto space-y-2'>
                  <p class='font-bold text-white'>MSBTE Scholar 2.0 • Premier Educational Platform for Polytechnic Students</p>
                  <p class='text-[11px] text-[#FAF6EE]/60'>Official Maharashtra State Board of Technical Education study resources, notes, model question papers, solved manuals, and verified job notices.</p>
                  <p class='text-[10px] text-[#D4AF37]'>&#169; 2026 MSBTE Scholar • CS Institute of Technology Deori</p>
                </div>
              </footer>
            </div>
          </b:if>
        </b:includable>

        <!-- Blogger Standard Comment Includables -->
        ${commentIncludables}

      </b:widget>
    </b:section>

    <!-- SECTION 5: SIDEBAR WIDGETS SECTION (For Blogger Layout Tab) -->
    <b:section id='sidebar-widgets' maxwidgets='4' name='Sidebar Widgets (Labels &amp; Social)' showaddelement='yes'>
      <b:widget id='Label1' locked='false' title='Subject Categories' type='Label' version='2' visible='true'>
        <b:widget-settings>
          <b:widget-setting name='sorting'>ALPHA</b:widget-setting>
          <b:widget-setting name='display'>LIST</b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <!-- Label widget registered in Layout -->
        </b:includable>
      </b:widget>

      <b:widget id='LinkList77' locked='false' title='Social Communities' type='LinkList' version='2' visible='true'>
        <b:widget-settings>
          <b:widget-setting name='sorting'>NONE</b:widget-setting>
          <b:widget-setting name='text-0'>WhatsApp Community</b:widget-setting>
          <b:widget-setting name='link-0'>https://chat.whatsapp.com/K6roXGbgAsFLSV1vdhZEQM</b:widget-setting>
          <b:widget-setting name='text-1'>Telegram Channel</b:widget-setting>
          <b:widget-setting name='link-1'>https://t.me/msbtescholar</b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <!-- LinkList widget registered in Layout -->
        </b:includable>
      </b:widget>

      <b:widget id='Profile2' locked='false' title='Author Profile' type='Profile' version='2' visible='true'>
        <b:includable id='main'>
          <!-- Profile widget registered in Layout -->
        </b:includable>
      </b:widget>
    </b:section>

    <!-- SECTION 6: BOTTOM ADS PLACEMENT -->
    <b:section id='bottom-ads' maxwidgets='2' name='Bottom Ads Placement' showaddelement='yes'>
      <b:widget id='HTML8' locked='false' title='Bottom AdSense Banner' type='HTML' version='2' visible='true'>
        <b:widget-settings>
          <b:widget-setting name='content'><![CDATA[<!-- AdSense / Sponsor slot -->]]></b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <!-- Bottom Ad slot registered in Layout -->
        </b:includable>
      </b:widget>
    </b:section>

    <!-- SECTION 7: FOOTER ATTRIBUTION SECTION -->
    <b:section id='footer-section' maxwidgets='3' name='Footer Info &amp; Attribution' showaddelement='yes'>
      <b:widget id='HTML33' locked='true' title='Footer Attribution' type='HTML' version='2' visible='true'>
        <b:widget-settings>
          <b:widget-setting name='content'><![CDATA[<div class="footer-attribution">&#169; 2026 MSBTE Scholar 2.0. All rights reserved.</div>]]></b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <!-- Footer attribution registered in Layout -->
        </b:includable>
      </b:widget>
    </b:section>

    <!-- ============================================================== -->
    <!-- GLOBAL INTERACTIVE POPUPS & MODALS                             -->
    <!-- 1. PWA Install Popup + Floating Button                         -->
    <!-- 2. MSBTE Syllabus & WhatsApp Community Selector Modal          -->
    <!-- 3. Security Warning Alert Modal (Anti-Inspect / Anti-Copy)     -->
    <!-- ============================================================== -->

    <!-- 1. PWA INSTALL POPUP -->
    <div class='pwa-overlay' id='pwaPopup'>
      <div class='pwa-modal'>
        <img alt='MSBTE Scholar' src='https://avatars.githubusercontent.com/u/225204281?v=4'/>
        <h3>Install MSBTE Scholar</h3>
        <p>Get instant access to MSBTE notes, solved manuals, and notifications directly on your phone home screen.</p>
        <div class='pwa-actions'>
          <button class='install-btn' id='pwaInstallBtn'>Install Now</button>
          <button class='later-btn' id='pwaLaterBtn'>Maybe Later</button>
        </div>
      </div>
    </div>

    <!-- FLOATING PWA INSTALL BUTTON -->
    <button aria-label='Install App' class='pwa-button' id='pwaFloatingBtn'>
      <svg fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'>
        <path d='M12 3v12'/>
        <path d='M7 10l5 5 5-5'/>
        <path d='M5 21h14'/>
      </svg>
    </button>

    <!-- 2. MSBTE SYLLABUS & WHATSAPP SELECTOR MODAL -->
    <div id='syllabusModal'>
      <div class='modal-content'>
        <div class='flex items-center justify-between mb-3 border-b border-[#E6DCC6] pb-2'>
          <h3 class='text-base font-black text-[#0B3B2E] flex items-center gap-2'>
            <span>📚</span>
            <span>Select Branch &amp; Semester</span>
          </h3>
          <button onclick='closeSyllabusModal()' style='padding:4px 8px; font-size:16px; background:none; border:none; cursor:pointer;'>✕</button>
        </div>
        
        <p class='text-xs text-[#5F5B52] mb-3'>Choose your diploma branch and semester to get direct subject syllabus copies and join verified WhatsApp study groups.</p>

        <label class='text-xs font-bold text-[#0B3B2E]' for='branchSelect'>Branch:</label>
        <select id='branchSelect' onchange='loadSemesters()'>
          <option value=''>-- Select Diploma Branch --</option>
          <option value='CO'>Computer Engineering (CO)</option>
          <option value='IT'>Information Technology (IT)</option>
          <option value='ME'>Mechanical Engineering (ME)</option>
          <option value='CE'>Civil Engineering (CE)</option>
          <option value='EE'>Electrical Engineering (EE)</option>
          <option value='ETC'>Electronics &amp; Telecom (ENTC)</option>
          <option value='AIML'>Artificial Intelligence &amp; ML (AIML)</option>
        </select>

        <label class='text-xs font-bold text-[#0B3B2E]' for='semesterSelect'>Semester:</label>
        <select disabled='disabled' id='semesterSelect' onchange='loadSubjects()'>
          <option value=''>-- Select Semester First --</option>
        </select>

        <label class='text-xs font-bold text-[#0B3B2E]' for='subjectSelect'>Subject:</label>
        <select disabled='disabled' id='subjectSelect'>
          <option value=''>-- Select Subject First --</option>
        </select>

        <div class='flex gap-2 mt-4'>
          <button class='primary' onclick='openSyllabus()'>Open Community / Notes →</button>
          <button class='secondary' onclick='closeSyllabusModal()'>Close</button>
        </div>
      </div>
    </div>

    <!-- 3. ANTI-INSPECT / SECURITY WARNING POPUP -->
    <div class='popup-alert' id='high-alert-popup'>
      <div class='popup-alert-icon'>⚠️</div>
      <div class='popup-alert-title'>Security Notice</div>
      <div class='popup-alert-message'>
        Right-click and source inspection are restricted to protect educational materials.<br/><br/>
        For permission, please contact the admin.
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- JAVASCRIPT: SYLLABUS, WHATSAPP LINKS, PWA & SECURITY           -->
    <!-- ============================================================== -->
    <script type='text/javascript'>
//<![CDATA[
${syllabusJs}

window.syllabusData = syllabusData;
window.syllabusLinks = syllabusLinks;

// Syllabus Modal Functions
function openSyllabusModal(e) {
  if (e) e.preventDefault();
  document.getElementById("syllabusModal").style.display = "flex";
}
window.openSyllabusModal = openSyllabusModal;

function closeSyllabusModal() {
  document.getElementById("syllabusModal").style.display = "none";
  document.getElementById("semesterSelect").innerHTML = '<option value="">-- Select Semester --</option>';
  document.getElementById("subjectSelect").innerHTML = '<option value="">-- Select Subject --</option>';
  document.getElementById("semesterSelect").disabled = true;
  document.getElementById("subjectSelect").disabled = true;
}
window.closeSyllabusModal = closeSyllabusModal;

function loadSemesters() {
  const branch = document.getElementById("branchSelect").value;
  const semesterSelect = document.getElementById("semesterSelect");
  semesterSelect.innerHTML = '<option value="">-- Select Semester --</option>';
  document.getElementById("subjectSelect").innerHTML = '<option value="">-- Select Subject --</option>';
  document.getElementById("subjectSelect").disabled = true;

  if (branch && syllabusData[branch]) {
    for (let sem in syllabusData[branch]) {
      let option = document.createElement("option");
      option.value = sem;
      option.text = sem;
      semesterSelect.appendChild(option);
    }
    semesterSelect.disabled = false;
  } else {
    semesterSelect.disabled = true;
  }
}
window.loadSemesters = loadSemesters;

function loadSubjects() {
  const branch = document.getElementById("branchSelect").value;
  const semester = document.getElementById("semesterSelect").value;
  const subjectSelect = document.getElementById("subjectSelect");
  subjectSelect.innerHTML = '<option value="">-- Select Subject --</option>';

  if (branch && semester && syllabusData[branch][semester]) {
    syllabusData[branch][semester].forEach(subject => {
      let option = document.createElement("option");
      option.value = subject;
      option.text = subject;
      subjectSelect.appendChild(option);
    });
    subjectSelect.disabled = false;
  } else {
    subjectSelect.disabled = true;
  }
}
window.loadSubjects = loadSubjects;

function openSyllabus() {
  const branch = document.getElementById("branchSelect").value;
  const semester = document.getElementById("semesterSelect").value;
  const subject = document.getElementById("subjectSelect").value;

  if (branch && semester && subject) {
    const url = syllabusLinks[branch]?.[semester]?.[subject];
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("Study link not available for selected subject. You can join the general community group.");
      window.open("https://chat.whatsapp.com/K6roXGbgAsFLSV1vdhZEQM", "_blank");
    }
  } else {
    alert("Please select Branch, Semester, and Subject.");
  }
}
window.openSyllabus = openSyllabus;

// PWA Install Prompt Handler
let deferredPrompt;
const pwaPopup = document.getElementById("pwaPopup");
const pwaInstallBtn = document.getElementById("pwaInstallBtn");
const pwaLaterBtn = document.getElementById("pwaLaterBtn");
const pwaFloatingBtn = document.getElementById("pwaFloatingBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (pwaPopup) pwaPopup.classList.add("show");
  if (pwaFloatingBtn) pwaFloatingBtn.style.display = "flex";
});

if (pwaInstallBtn) {
  pwaInstallBtn.addEventListener("click", async () => {
    if (pwaPopup) pwaPopup.classList.remove("show");
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
    }
  });
}

if (pwaFloatingBtn) {
  pwaFloatingBtn.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
    }
  });
}

if (pwaLaterBtn) {
  pwaLaterBtn.addEventListener("click", () => {
    if (pwaPopup) pwaPopup.classList.remove("show");
  });
}

window.addEventListener("appinstalled", () => {
  if (pwaPopup) pwaPopup.classList.remove("show");
  if (pwaFloatingBtn) pwaFloatingBtn.style.display = "none";
});

// Security Warning / Anti-Inspect Popup
let alertTimeout;
function showHighAlert() {
  const popup = document.getElementById('high-alert-popup');
  if (!popup) return;
  popup.classList.add('show');
  clearTimeout(alertTimeout);
  alertTimeout = setTimeout(() => {
    popup.classList.remove('show');
  }, 3500);
}

document.addEventListener('contextmenu', function(e) {
  // Allow normal interactions inside forms and input fields
  if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
  e.preventDefault();
  showHighAlert();
});

document.addEventListener('keydown', function(e) {
  if (
    (e.ctrlKey && ['u', 's', 'c'].includes(e.key.toLowerCase())) ||
    e.key === 'F12'
  ) {
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
    e.preventDefault();
    showHighAlert();
    return false;
  }
});
//]]>
    </script>

  </body>
</html>
`;

  const targetPath = path.join(__dirname, 'msbtescholar-theme.xml');
  const bloggerDir = path.join(__dirname, 'blogger-theme');
  if (!fs.existsSync(bloggerDir)) fs.mkdirSync(bloggerDir, { recursive: true });
  const folderTargetPath = path.join(bloggerDir, 'msbtescholar-theme.xml');

  fs.writeFileSync(targetPath, themeXml, 'utf8');
  fs.writeFileSync(folderTargetPath, themeXml, 'utf8');
  console.log('6. SUCCESS! Written Ultimate Hybrid Theme to:');
  console.log('   - ' + targetPath);
  console.log('   - ' + folderTargetPath);
  console.log('   Total Theme File Size:', (themeXml.length / 1024).toFixed(1), 'KB');
}

buildTheme().catch(err => {
  console.error('Build Theme Error:', err);
  process.exit(1);
});

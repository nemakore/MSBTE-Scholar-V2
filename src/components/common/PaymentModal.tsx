'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, CreditCard, Smartphone, Sparkles, Loader2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface PaymentModalProps {
  itemType: 'premium' | 'project';
  title: string;
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  itemType,
  title,
  amount,
  onSuccess,
  onClose,
}) => {
  const { updateProfile } = useApp();
  const [method, setMethod] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState('student@oksbi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      if (itemType === 'premium') {
        updateProfile({ isPremium: true });
      }
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF6EE] dark:bg-[#141414] border border-[#E6DCC6] dark:border-[#2A2A2A] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Razorpay-style Header */}
        <div className="bg-[#0B3B2E] text-white px-5 py-4 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#062D24] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-xs">
              ₹
            </div>
            <div>
              <div className="text-[10px] text-[#F1DFA4] uppercase tracking-wider font-semibold">
                RAZORPAY SECURE CHECKOUT (TEST MODE)
              </div>
              <h3 className="text-sm font-bold text-white">MSBTE Scholar 2.0</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuccess ? (
          <div className="p-5 space-y-4">
            {/* Order summary box */}
            <div className="bg-white dark:bg-[#1C1C1C] p-4 rounded-xl border border-[#E6DCC6] dark:border-[#2A2A2A]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-semibold text-[#5F5B52] dark:text-[#A09A8F]">
                    {itemType === 'premium' ? 'Semester Pass' : 'Project Code Deliverable'}
                  </span>
                  <h4 className="font-bold text-sm text-[#0B3B2E] dark:text-white mt-0.5">
                    {title}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-[#0B3B2E] dark:text-[#D4AF37]">
                    ₹{amount}
                  </span>
                  <span className="block text-[10px] text-[#1FA971] font-semibold">Zero Convenience Fee</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#5F5B52] dark:text-[#AAA]">
                Select Payment Method:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('upi')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 justify-center transition-all ${
                    method === 'upi'
                      ? 'border-[#0B3B2E] bg-[#E7F2EE] text-[#0B3B2E] dark:border-[#D4AF37] dark:bg-[#062D24] dark:text-[#F1DFA4]'
                      : 'border-[#E6DCC6] bg-white text-[#5F5B52] dark:bg-[#202020]'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  UPI (GPay / PhonePe)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 justify-center transition-all ${
                    method === 'card'
                      ? 'border-[#0B3B2E] bg-[#E7F2EE] text-[#0B3B2E] dark:border-[#D4AF37] dark:bg-[#062D24] dark:text-[#F1DFA4]'
                      : 'border-[#E6DCC6] bg-white text-[#5F5B52] dark:bg-[#202020]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Debit / ATM Card
                </button>
              </div>
            </div>

            {/* UPI ID input */}
            {method === 'upi' ? (
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#5F5B52] dark:text-[#AAA]">
                  Virtual Payment Address (VPA / UPI ID)
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-xs font-medium focus:outline-none focus:border-[#0B3B2E] dark:focus:border-[#D4AF37]"
                  placeholder="username@okhdfcbank"
                />
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-xs font-medium text-[#5F5B52] dark:text-[#AAA]">
                    Card Number
                  </label>
                  <input
                    type="text"
                    defaultValue="4111 •••• •••• 1111 (Test Card)"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1A1A1A] font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    defaultValue="12/28"
                    className="px-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1A1A1A]"
                    placeholder="MM/YY"
                  />
                  <input
                    type="password"
                    defaultValue="123"
                    className="px-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1A1A1A]"
                    placeholder="CVV"
                  />
                </div>
              </div>
            )}

            {/* Security note */}
            <div className="flex items-center gap-2 text-[11px] text-[#5F5B52] dark:text-[#888] bg-[#FAF6EE] dark:bg-[#1A1A1A] p-2.5 rounded-lg border border-[#E6DCC6]">
              <Lock className="w-3.5 h-3.5 text-[#1FA971]" />
              <span>256-bit SSL encrypted • Instant unlock confirmation</span>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-[#0B3B2E] text-white hover:bg-[#062D24] font-bold text-sm flex items-center justify-center gap-2 shadow-gold transition-all active:scale-98 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                  <span>Verifying Signature with Razorpay...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Pay ₹{amount} Securely</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Payment Success view */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E7F7EE] text-[#1FA971] flex items-center justify-center mx-auto border-2 border-[#1FA971]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#0B3B2E] dark:text-white">
                Payment Verified!
              </h4>
              <p className="text-xs text-[#5F5B52] dark:text-[#A09A8F] mt-1">
                Transaction ID: rzp_test_{Math.floor(Math.random() * 899999 + 100000)}
              </p>
            </div>
            <div className="p-3 bg-[#E7F7EE] dark:bg-[#1FA971]/20 rounded-xl border border-[#1FA971]/30 text-xs font-semibold text-[#1FA971]">
              Access has been activated for your account!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

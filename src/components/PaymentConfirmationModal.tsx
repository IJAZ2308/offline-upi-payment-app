"use client"

import { Transaction } from "@/app/payment/page"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Download } from "lucide-react"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

interface PaymentConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction: Transaction
}

export function PaymentConfirmationModal({
  open,
  onOpenChange,
  transaction,
}: PaymentConfirmationModalProps) {
  const isSuccess = transaction.status === "success"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Payment {isSuccess ? "Successful" : "Failed"}</DialogTitle>
          <DialogDescription className="text-center">
            {isSuccess ? "Your payment has been processed" : "Payment was not completed"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={transaction.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex justify-center"
            >
              {isSuccess ? (
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                    className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="absolute inset-0 rounded-full bg-green-400/20 blur-xl"
                  />
                </div>
              ) : (
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                    className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full"
                  >
                    <XCircle className="w-16 h-16 text-red-600 dark:text-red-400" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="absolute inset-0 rounded-full bg-red-400/20 blur-xl"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Transaction Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3 p-4 bg-muted/50 rounded-lg"
          >
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-2xl font-bold">₹{transaction.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Merchant</span>
              <span className="font-medium">{transaction.merchantName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">UPI ID</span>
              <span className="text-sm font-mono">{transaction.upiId}</span>
            </div>
            {transaction.note && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Note</span>
                <span className="text-sm">{transaction.note}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Transaction ID</span>
              <span className="text-sm font-mono">TXN-{transaction.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Time</span>
              <span className="text-sm">{format(new Date(transaction.timestamp * 1000), "MMM dd, yyyy hh:mm a")}</span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3"
          >
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
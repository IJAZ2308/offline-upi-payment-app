"use client"

import { Transaction } from "@/app/payment/page"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle, Receipt } from "lucide-react"
import { format } from "date-fns"

interface PaymentHistoryProps {
  transactions: Transaction[]
}

export function PaymentHistory({ transactions }: PaymentHistoryProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Receipt className="w-12 h-12 text-muted-foreground/50 mb-3" />
        <p className="text-sm text-muted-foreground">No transactions yet</p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Your payment history will appear here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto payment-history">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="transaction-item flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
        >
          <div className="mt-1">
            {transaction.status === "success" && (
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
            )}
            {transaction.status === "pending" && (
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
            )}
            {transaction.status === "failed" && (
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold truncate">{transaction.merchantName}</p>
                <p className="text-xs text-muted-foreground truncate">{transaction.upiId}</p>
                {transaction.note && (
                  <p className="text-xs text-muted-foreground/70 mt-1 truncate">{transaction.note}</p>
                )}
              </div>
              <p className="font-bold text-lg whitespace-nowrap">₹{transaction.amount.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant={
                  transaction.status === "success"
                    ? "default"
                    : transaction.status === "pending"
                    ? "secondary"
                    : "destructive"
                }
                className="text-xs"
              >
                {transaction.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {format(new Date(transaction.timestamp * 1000), "MMM dd, hh:mm a")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import QRCode from "react-qr-code"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface QRCodeDisplayProps {
  upiString: string
  amount: string
  merchantName: string
  onPaymentComplete: (status: "success" | "failed") => void
  isProcessing?: boolean
}

export function QRCodeDisplay({ upiString, amount, merchantName, onPaymentComplete, isProcessing = false }: QRCodeDisplayProps) {
  return (
    <Card className="payment-card qr-card">
      <CardHeader>
        <CardTitle>Scan to Pay</CardTitle>
        <CardDescription>Scan this QR code with any UPI app</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center p-6 bg-white rounded-lg">
          <QRCode value={upiString} size={200} />
        </div>

        <div className="space-y-2 text-center">
          <p className="text-2xl font-bold">₹{amount}</p>
          <p className="text-sm text-muted-foreground">{merchantName || "Merchant"}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => onPaymentComplete("failed")}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            Cancel
          </Button>
          <Button
            className="gap-2 bg-green-600 hover:bg-green-700"
            onClick={() => onPaymentComplete("success")}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            Paid
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          {isProcessing ? "Saving transaction..." : "Click \"Paid\" after completing the payment in your UPI app"}
        </p>
      </CardContent>
    </Card>
  )
}
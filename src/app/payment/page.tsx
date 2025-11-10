"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { QRCodeDisplay } from "@/components/QRCodeDisplay"
import { PaymentHistory } from "@/components/PaymentHistory"
import { PaymentConfirmationModal } from "@/components/PaymentConfirmationModal"
import { ArrowLeft, Wallet, QrCode, History, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export interface Transaction {
  id: number
  merchantName: string
  amount: number
  status: "success" | "pending" | "failed"
  timestamp: number
  upiId: string
  note?: string | null
  createdAt: number
}

export default function PaymentPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [merchantName, setMerchantName] = useState("")
  const [upiId, setUpiId] = useState("")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [showQR, setShowQR] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/payment")
    }
  }, [session, isPending, router])

  // Fetch transactions on component mount
  useEffect(() => {
    if (session?.user) {
      fetchTransactions()
    }
  }, [session])

  const fetchTransactions = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/transactions?limit=20")
      if (!response.ok) {
        throw new Error("Failed to fetch transactions")
      }
      const data = await response.json()
      setTransactions(data)
    } catch (error) {
      console.error("Error fetching transactions:", error)
      toast.error("Failed to load transaction history")
    } finally {
      setIsLoading(false)
    }
  }

  const generateUPIString = () => {
    if (!upiId || !amount) return ""
    const params = new URLSearchParams({
      pa: upiId,
      pn: merchantName || "Merchant",
      am: amount,
      cu: "INR",
      tn: note || "Payment",
    })
    return `upi://pay?${params.toString()}`
  }

  const handleGenerateQR = () => {
    if (upiId && amount) {
      setShowQR(true)
    }
  }

  const handlePaymentComplete = async (status: "success" | "failed") => {
    try {
      setIsCreating(true)
      const timestamp = Math.floor(Date.now() / 1000)
      
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchantName: merchantName || "Merchant",
          upiId,
          amount: parseFloat(amount),
          status,
          note: note || null,
          timestamp,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save transaction")
      }

      const transaction = await response.json()
      
      // Add to local state and show confirmation
      setTransactions([transaction, ...transactions])
      setCurrentTransaction(transaction)
      setShowQR(false)
      setShowConfirmation(true)
      
      // Reset form
      setMerchantName("")
      setUpiId("")
      setAmount("")
      setNote("")
      
      toast.success(`Payment ${status === "success" ? "completed" : "cancelled"}`)
    } catch (error) {
      console.error("Error saving transaction:", error)
      toast.error("Failed to save transaction")
    } finally {
      setIsCreating(false)
    }
  }

  // Show loading state while checking auth
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Don't render if not authenticated
  if (!session?.user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              UPI Offline Payment
            </h1>
          </div>
          <p className="text-muted-foreground">Generate QR codes for offline UPI payments</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            <Card className="payment-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Payment Details
                </CardTitle>
                <CardDescription>Enter merchant and payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="merchantName">Merchant Name</Label>
                  <Input
                    id="merchantName"
                    placeholder="Enter merchant name"
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID *</Label>
                  <Input
                    id="upiId"
                    placeholder="merchant@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Input
                    id="note"
                    placeholder="Payment for..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={handleGenerateQR}
                  disabled={!upiId || !amount || isCreating}
                >
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>

            {/* QR Code Display */}
            {showQR && (
              <QRCodeDisplay
                upiString={generateUPIString()}
                amount={amount}
                merchantName={merchantName}
                onPaymentComplete={handlePaymentComplete}
                isProcessing={isCreating}
              />
            )}
          </div>

          {/* Payment History */}
          <div>
            <Card className="payment-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Your payment history</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">Loading transactions...</p>
                  </div>
                ) : (
                  <PaymentHistory transactions={transactions} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {currentTransaction && (
        <PaymentConfirmationModal
          open={showConfirmation}
          onOpenChange={setShowConfirmation}
          transaction={currentTransaction}
        />
      )}
    </div>
  )
}
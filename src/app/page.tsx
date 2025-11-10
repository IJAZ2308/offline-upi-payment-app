"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, QrCode, History, Shield, Zap, Smartphone } from "lucide-react"
import { useSession } from "@/lib/auth-client"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4">
            <Wallet className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            UPI Offline Payment
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate QR codes for seamless offline UPI payments. Fast, secure, and simple payment collection for merchants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {session?.user ? (
              <>
                <Link href="/payment">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8">
                    <QrCode className="w-5 h-5" />
                    Start Payment
                  </Button>
                </Link>
                <Link href="/payment">
                  <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                    <History className="w-5 h-5" />
                    View History
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8">
                    <QrCode className="w-5 h-5" />
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                    Log In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="feature-card border-2 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300">
            <CardHeader>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg w-fit mb-2">
                <QrCode className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Instant QR Generation</CardTitle>
              <CardDescription>
                Create payment QR codes instantly with merchant details and amount
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="feature-card border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
            <CardHeader>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg w-fit mb-2">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Secure Payments</CardTitle>
              <CardDescription>
                All transactions are processed through standard UPI protocols
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="feature-card border-2 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300">
            <CardHeader>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg w-fit mb-2">
                <History className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                Track all your transactions with detailed payment history
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="font-semibold text-lg">Enter Details</h3>
              <p className="text-muted-foreground text-sm">
                Fill in merchant name, UPI ID, and payment amount
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="font-semibold text-lg">Generate QR Code</h3>
              <p className="text-muted-foreground text-sm">
                Get an instant QR code for the payment request
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="font-semibold text-lg">Scan & Pay</h3>
              <p className="text-muted-foreground text-sm">
                Customer scans with any UPI app to complete payment
              </p>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Why Choose UPI Offline Payment?</CardTitle>
            <CardDescription>Built for modern merchants and businesses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Lightning Fast</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate QR codes in seconds and receive payments instantly
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Works Offline</h4>
                  <p className="text-sm text-muted-foreground">
                    No internet needed to generate QR codes, works anywhere
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">100% Secure</h4>
                  <p className="text-sm text-muted-foreground">
                    Standard UPI protocol ensures safe and secure transactions
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <History className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Transaction Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep track of all payments with detailed history
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
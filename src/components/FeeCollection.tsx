import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";

const feeStructure = [
  { category: "Tuition Fee", amount: 2500, dueDate: "Monthly" },
  { category: "Library Fee", amount: 150, dueDate: "Semester" },
  { category: "Lab Fee", amount: 300, dueDate: "Semester" },
  { category: "Sports Fee", amount: 200, dueDate: "Annual" },
  { category: "Development Fee", amount: 500, dueDate: "Annual" },
];

const paymentHistory = [
  { 
    month: "June 2024", 
    amount: 2500, 
    status: "Paid", 
    paidDate: "2024-06-05", 
    dueDate: "2024-06-10",
    category: "Tuition Fee",
    transactionId: "TXN123456789"
  },
  { 
    month: "May 2024", 
    amount: 2500, 
    status: "Paid", 
    paidDate: "2024-05-03", 
    dueDate: "2024-05-10",
    category: "Tuition Fee",
    transactionId: "TXN123456788"
  },
  { 
    month: "April 2024", 
    amount: 2500, 
    status: "Paid", 
    paidDate: "2024-04-08", 
    dueDate: "2024-04-10",
    category: "Tuition Fee",
    transactionId: "TXN123456787"
  },
  { 
    month: "March 2024", 
    amount: 2500, 
    status: "Late Payment", 
    paidDate: "2024-03-15", 
    dueDate: "2024-03-10",
    category: "Tuition Fee",
    transactionId: "TXN123456786"
  },
];

const pendingPayments = [
  { 
    month: "July 2024", 
    amount: 2500, 
    dueDate: "2024-07-10",
    category: "Tuition Fee",
    daysLeft: 5
  },
  { 
    semester: "Fall 2024", 
    amount: 450, 
    dueDate: "2024-08-15",
    category: "Lab & Library Fee",
    daysLeft: 35
  },
];

const totalStats = {
  totalPaid: 12500,
  totalPending: 2950,
  onTimePayments: 8,
  latePayments: 1,
};

export default function FeeCollection() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "text-emerald-600";
      case "Pending": return "text-amber-600";
      case "Late Payment": return "text-red-600";
      case "Overdue": return "text-red-700";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid": return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case "Pending": return <Clock className="h-4 w-4 text-amber-600" />;
      case "Late Payment": return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "Overdue": return <AlertCircle className="h-4 w-4 text-red-700" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid": return "default";
      case "Pending": return "secondary";
      case "Late Payment": return "destructive";
      case "Overdue": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Fee Collection
        </h1>
        <p className="text-muted-foreground">Manage your fee payments and view payment history</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold">PKR {totalStats.totalPaid}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">PKR {totalStats.totalPending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Time</p>
                <p className="text-2xl font-bold">{totalStats.onTimePayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Late Payments</p>
                <p className="text-2xl font-bold">{totalStats.latePayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Payments */}
      <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-600" />
            Pending Payments
          </CardTitle>
          <CardDescription>Upcoming fee payments due</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pendingPayments.map((payment, index) => (
              <div key={index} className="flex flex-col p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <CreditCard className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{payment.category}</h4>
                    <p className="text-xs text-muted-foreground">
                      {payment.month || payment.semester}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className="text-lg font-bold">PKR {payment.amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Due Date</span>
                    <span className="text-sm">{payment.dueDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant="secondary" className="text-xs">Pending</Badge>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-amber-600 mb-3 text-center">
                    {payment.daysLeft} days remaining
                  </p>
                  <Button size="sm" className="w-full">
                    Pay Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Structure */}
        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardHeader>
            <CardTitle>Fee Structure</CardTitle>
            <CardDescription>Annual fee breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feeStructure.map((fee, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{fee.category}</p>
                    <p className="text-sm text-muted-foreground">{fee.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">PKR {fee.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Recent payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(payment.status)}
                    <div>
                      <p className="font-medium">{payment.month}</p>
                      <p className="text-sm text-muted-foreground">
                        Paid: {payment.paidDate}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ID: {payment.transactionId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">PKR {payment.amount}</p>
                    <Badge variant={getStatusBadge(payment.status) as any}>
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
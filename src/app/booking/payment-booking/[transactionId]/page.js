import { sendRequest } from "@/utils/api";
import "@/styles/payment/payment.css";
import PaymentBookingSuccess from "@/components/booking/PaymentBookingSuccess";
import PaymentBookingFail from "@/components/booking/PaymentBookingFail";

export default async function PaymentBooking({ params, searchParams }) {
  if (searchParams.vnp_ResponseCode == "00") {
    const transactionDetail = await {
      amount: searchParams.vnp_Amount,
      bankCode: searchParams.vnp_BankCode,
      status: searchParams.vnp_ResponseCode,
      transactionNumber: searchParams.vnp_TransactionNo,
      invoiceNumber: searchParams.vnp_TxnRef,
      transactionId: params.transactionId,
    };
    const resTransactionDetail = await sendRequest({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/transaction-detail`,
      body: transactionDetail,
      method: "POST",
    });
    return <PaymentBookingSuccess text={"Payment"} link={"history-booking"} />;
  } else {
    return <PaymentBookingFail />;
  }
}

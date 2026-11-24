import PageHeader from "@/components/admin/PageHeader";
import CheckInConsole from "@/components/admin/CheckInConsole";

export const metadata = { title: "Check-in" };

export default function CheckInPage() {
  return (
    <>
      <PageHeader title="Check-in" subtitle="Scan a ticket QR code or type the code. Each ticket can only be used once." />
      <CheckInConsole />
    </>
  );
}

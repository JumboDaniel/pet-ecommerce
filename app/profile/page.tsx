//@ts-nocheck
import { CardContent, Card, CardTitle, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: userdata, error: userdataerror } =
    await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uid", (await supabase.auth.getUser()).data.user.id);
  const { data: appointment, error: errorappointment } = await supabase
    .from("appointment")
    .select("*")
    .eq("uid", (await supabase.auth.getUser()).data.user.id);
  const userprofile = data[0];
  // Function to get the first character of a string, handling edge cases
  function getFirstCharacter(name: string) {
    if (!name || typeof name !== "string") {
      return ""; // Return empty string for invalid input
    }
    return name.charAt(0).toUpperCase();
  }
  const initial = ` ${getFirstCharacter(
    userprofile.first_name
  )} ${getFirstCharacter(userprofile.last_name)}`;
  if (userdataerror || !userdata?.user) {
    redirect("/login");
  }
  return (
    <div className="mt-12 flex justify-center">
      <div className="grid gap-6 md:grid-cols-[350px_1fr] lg:grid-cols-[400px_1fr] max-w-6xl w-full px-4 md:px-6">
        <div className="flex flex-col gap-2">
          <Card className="border-0 shadow-none">
            <CardContent className="flex flex-col items-center gap-2 text-center">
              <Avatar className="w-16 h-16 border">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="font-bold">
                {userprofile?.first_name} {userprofile?.last_name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                @{userprofile?.first_name} {userprofile?.last_name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {userprofile?.email}
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#e4b1f6]">
            <CardHeader>
              <CardTitle className="text-[#0b3339]">My Pets</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-1.5">
                <Link className="flex items-center gap-2" href="#">

                  <span className="font-semibold text-[#0b3339]">Buddy</span>
                </Link>
                <div className="flex items-center gap-2">

                  <span className="font-semibold text-[#0b3339]">Luna</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0b3339]">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[#0b3339]">Order</TableHead>
                      <TableHead className="text-[#0b3339]">Items</TableHead>
                      <TableHead className="text-[#0b3339]">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Link className="font-semibold text-[#0b3339]" href="#">
                          #1234
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          2 items
                        </div>
                      </TableCell>
                      <TableCell className="text-[#0b3339]">$49.99</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Link className="font-semibold text-[#0b3339]" href="#">
                          #5678
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          1 item
                        </div>
                      </TableCell>
                      <TableCell className="text-[#0b3339]">$29.99</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0b3339]">Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <AppointmentsTable data={appointment} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0b3339]">
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[#0b3339]">First Name</Label>
                  <Label className="text-[#0b3339]">Last Name</Label>
                  <Label className="text-[#0b3339]">Email</Label>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="text-[#0b3339]">
                    {userprofile?.first_name}
                  </div>
                  <div className="text-[#0b3339]">{userprofile?.last_name}</div>
                  <div className="text-[#0b3339]">{userprofile?.email}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const AppointmentsTable = ({ data }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString(undefined, options);
  };
  if (data.length === 0) {
    return <div>No appointments found.</div>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-[#0b3339]">Date</TableHead>
          <TableHead className="text-[#0b3339]">Time</TableHead>
          <TableHead className="text-[#0b3339]">Service</TableHead>
          <TableHead className="text-[#0b3339]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="text-[#0b3339]">
              {formatDate(appointment.date)}
            </TableCell>
            <TableCell className="text-[#0b3339]">
              {formatTime(appointment.date)}
            </TableCell>
            <TableCell className="text-[#0b3339]">
              {appointment.product_name}
            </TableCell>
            <TableCell className="text-[#0b3339]">
              {/* Add logic to determine the status */}
              Confirmed
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

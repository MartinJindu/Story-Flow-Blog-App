import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";

export default function NoSessionCard() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Card className="max-w-md text-center">
        <CardHeader>
          <CardTitle>Sign In Required...</CardTitle>
          <CardDescription>Please log in to create a post.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

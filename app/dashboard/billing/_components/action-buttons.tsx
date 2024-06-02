"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initDepositSchema } from "@/schema";
import { initDepositDefault } from "@/schema/default";
import { initDeposit } from "@/lib/billing-service";
import { z } from "zod";
import { revalidatePathServer } from "@/lib/action-utils";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import FormInput from "@/components/form/input";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ActionButtonsProps = {
  session: Session;
};

const ActionButtons = ({ session }: ActionButtonsProps) => {
  const [loading, startAddTransition] = useTransition();
  const [paymentLink, setPaymentLink] = useState("");

  const addForm = useForm<z.infer<typeof initDepositSchema>>({
    resolver: zodResolver(initDepositSchema),
    defaultValues: initDepositDefault,
  });

  async function onAddSubmit(values: z.infer<typeof initDepositSchema>) {
    startAddTransition(async () => {
      const data = await initDeposit(session.accessToken, values.amount);
      if ("error" in data) {
        toast.error(data.error);
        return;
      } else {
        toast.success("Redirection link created successfully");
        await revalidatePathServer("/dashboard/billing");
        addForm.reset(initDepositDefault);
        setPaymentLink(data.data.RedirectURL);
      }
    });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"xs"}>Deposit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deposit</DialogTitle>
            <DialogDescription>
              Once you fill in the form and submit, you will be given a link to
              complete your payment.
            </DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form
              onSubmit={addForm.handleSubmit(onAddSubmit)}
              className="space-y-4"
            >
              <FormInput
                label="Amount (Rp)"
                name="amount"
                placeholder="Deposit amount"
                type="number"
              />
              {paymentLink && (
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="Payment URL">Payment URL</Label>
                  <Input
                    className="w-full"
                    value={paymentLink}
                    readOnly
                    type="text"
                    id="paymentURL"
                  />
                </div>
              )}
              <Button disabled={loading} type="submit">
                {loading ? "Loading" : "Deposit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"} size={"xs"}>
            Billing rate information
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Billing rate</DialogTitle>
            <DialogDescription>
              The following metrics are used to calculate your billing rate.
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm">
            CPU Usage Cost: 0.0175 IDR/clock tick <br />
            Memory Usage Cost: 0.08 IDR/MB <br />
            Network Ingress Cost: 0.00175 IDR/B <br />
            Network Egress Cost: 0.00175 IDR/B
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ActionButtons;

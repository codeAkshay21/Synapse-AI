import { onGetSubscriptionPlan } from "@/actions/settings";
import React from "react";
import Section from "../section-label";
import { Card, CardContent, CardDescription } from "../ui/card";
import { CheckCircle2, Plus } from "lucide-react";
import { pricingCards } from "@/constants/landing-page";

type Props = {};

const billingsettings = async (props: Props) => {
  {
    /*}  <p className="text-sm font-light">
          {plan== 'PRO'
          ?'Start growing your business today'
          : plan == 'ULTIMATE'
          ? 'The ultimate growth plan that sets you up for success'
          : 'Perfect if you"re getting started with Synapse AI'
          }
        </p>*/
  }

  const plan = await onGetSubscriptionPlan();
  const planFeatures = pricingCards.find(
    (card) => card.title.toUpperCase() === plan?.toUpperCase()
  )?.features;
  if (!planFeatures) return;

  console.log(planFeatures);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Billing settings"
          message="Add payment information, upgrade and modify your plan."
        />
      </div>
      <div className="lg:col-span-2 flex justify-start lg:justify-center">
        <Card className="border-dashed bg-cream border-gray-400 w-full cursor-pointer h-[270px] flex justify-center items-center">
          <CardContent className="flex gap-2 items-center">
            <div className="rounded-full border-2 p-1">
              <Plus className="text-gray-400" />
            </div>
            <CardDescription className="font-semibold">
              Upgrade Plan
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <h3 className="text-xl font-semibold mb-2">Current Plan</h3>
        <p className="text-sm font-semibold">{plan}</p>
        <div className="flex gap-2 flex-col mt-2">
          {planFeatures.map((feature) => (
            <div key={feature} className="flex gap-2">
              <CheckCircle2 className="text-muted-foreground" />
              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default billingsettings;

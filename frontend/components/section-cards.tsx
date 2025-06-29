import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      
      {/* Total Meetings */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Meetings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            84
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +9.8%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Increase in weekly usage <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Based on last 7 days</div>
        </CardFooter>
      </Card>

      {/* Videos Processed */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Videos Processed</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            67
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +14.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            AI summaries generated <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Improved model performance</div>
        </CardFooter>
      </Card>

      {/* Active Users */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            128
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +6.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Returning users this week <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Stable retention trend</div>
        </CardFooter>
      </Card>

      {/* Failed Recordings */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Failed Recordings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums text-red-500 @[250px]/card:text-3xl">
            2
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown className="text-red-500" />
              -1.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium text-red-500">
            Slight drop in reliability <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Check logs for details</div>
        </CardFooter>
      </Card>
    </div>
  );
}

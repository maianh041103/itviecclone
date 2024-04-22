import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MongooseHealthIndicator,
} from "@nestjs/terminus";
import { Public } from "src/decorator/customize";

@Controller("health")
export class HealthController {

  constructor(
    private healthCheck: HealthCheckService,
    private mongooseHealth: MongooseHealthIndicator,
  ) {
  }

  @Get()
  @Public()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.healthCheck.check(
      [
        () => this.mongooseHealth.pingCheck("database"),
      ],
    );
  }

}

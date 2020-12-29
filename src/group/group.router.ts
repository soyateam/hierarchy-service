import { Router } from "express";
import { BaseRequest } from "../utils/baseRequest";
import { GroupController } from "./group.controller";
import { Validations } from "../utils/validations/validations";

const GroupRouter: Router = Router();

GroupRouter.get('/dates', BaseRequest.wrapAsync(GroupController.getDateFilters));

GroupRouter.get(`/children/:id?`, BaseRequest.wrapAsync(GroupController.getChildrenByParentId));
GroupRouter.get(`/:id`, Validations.isIdParamValid, BaseRequest.wrapAsync(GroupController.getById));

GroupRouter.post(`/unit`, Validations.isUnitBodyValid, BaseRequest.wrapAsync(GroupController.getUnitsSums));
GroupRouter.post(`/`, Validations.isIdsBodyValid, BaseRequest.wrapAsync(GroupController.getManyByIds));

GroupRouter.put(
  `/:id`,
  Validations.isIdParamValid,
  Validations.IsTaskGrowValid,
  BaseRequest.wrapAsync(GroupController.updateCounter)
);

export { GroupRouter };

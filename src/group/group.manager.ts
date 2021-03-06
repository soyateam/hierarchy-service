import { GroupRepository } from "./group.repository";
import { IResponseGetByMany, IResponseUnitSums, IUnit } from "../response/response.interface";
import { IGroup } from "./group.interface";
import config from '../config';

export class GroupManager {
  static getById(id: string, dateFilter?: string) {
    return GroupRepository.getById(id, dateFilter);
  }

  static getByParentId(pId: string, dateFilter?: string) {
    return GroupRepository.getChildrenByParentId(pId, dateFilter);
  }

  static getAllByParentId(pId: string, dateFilter?: string) {
    return GroupRepository.getAllChildrenByParentId(pId, dateFilter);
  }

  static async getSumOfMainGroup(unitFilter?: string, dateFilter?: string) {
    return await GroupRepository.getSumOfMainGroup(unitFilter, dateFilter);
  }

  static async getManyByIds(ids: [string], dateFilter?: string) {
    let response: IResponseGetByMany = { groups: [], notFound: [] };
    await Promise.all(
      ids.map(async (id) => {
        const group: IGroup | null = await GroupRepository.getById(id, dateFilter);
        group ? response.groups.push(group) : response.notFound.push(id);
      })
    );

    return response;
  }

  static async getUnitsInfo(unitNames: [string], dateFilter?: string) {
    let response: IResponseUnitSums = { units: [], notFound: [] };
    await Promise.all(
      unitNames.map(async (unitName) => {
        const unit: IUnit[] = await GroupRepository.getUnitInfo(unitName, dateFilter);
        unit.length > 0 ? response.units.push(unit[0]) : response.notFound.push(unitName);
      })
    );

    return response;
  }

  static async updateMultipleCounter(groups: string[], isInc: boolean) {
    const amountUpdate = isInc ? 1 : -1;
    return await GroupRepository.updateByManyIds(groups, amountUpdate);
  }

  static async updateCounter(id: string, isInc: boolean) {
    const amountUpdate = isInc ? 1 : -1;
    return GroupRepository.updateById(id, amountUpdate);
  }

  static async getUnitsNames(dateFilter?: string) {
    return await GroupRepository.getUnitsNames(dateFilter);
  }

  static async getDateFilters() {
    return await GroupRepository.getDateFilters();
  }
}

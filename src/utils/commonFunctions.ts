import { differenceInMinutes, format } from 'date-fns';
import axios from './axios';
import { LogType, Vehicle } from './types';

export const regexPlateNumber: RegExp = /^([A-Za-z]{3})-([0-9]{5})$/

const getAmount = (type: string) => {
    switch (type) {
        case "Residente":
            return 0.05
        case "No residente":
            return 0.5
        case "Oficial":
            return 0
        default:
            return 0
    }
}

export const getTimeAmountByType = async (vehicle: Vehicle, log: LogType) => {
    const totalMinutes = differenceInMinutes(new Date(), new Date(log.dateEntry))
    const amount = getAmount(vehicle.typeVehicle) * totalMinutes;
    const { data: registerPay } = await axios.post("pays", { idVehicle: vehicle.id, date: new Date(), amount: amount, time: totalMinutes })
    return {
        time: totalMinutes,
        amount: amount
    }
}

export const formatterDate = (date: Date) => {
    const formattype = "d 'de' MMMM yyyy 'a las' HH:mm";
    return format(new Date(date), formattype);
}

export const typeVehicles: Array<string> = [
    "Residente",
    "No residente",
    "Oficial",
]

export type TypesVehicles = typeof typeVehicles[number];

export interface Vehicle {
    id?: number
    plate: string
    typeVehicle: TypesVehicles
    active: boolean
}

export interface StoreFunctionsType {
    setVehicle: (params: Vehicle) => void
    closeModalRegisterEntry: () => void
    setRegisterEntry: (params: Vehicle) => void
    setRegisterExit: (params: Vehicle) => void
    startMonth: () => void
    getDetailsVehicle: (id: number) => void
}

export interface StoreContextType extends StoreFunctionsType {
    loading: Boolean
    listVehicles: Array<Vehicle>
    registerEntryState: ModalState,
    detailsVehicle?: DetailsVehicleType
}

export interface ActionsButtonType {
    label: string
    callback: () => void
    color: string
}

export interface ModalState {
    show: boolean
    vehicle?: Vehicle
}

export interface LogType {
    id: number
    idVehicle: number
    dateExit?: Date,
    dateEntry: Date
}

export interface LogsFunctionEnd {
    totalTime: number,
    totalPay: number
}

export interface FunctionLogsEnd {
    object: LogsFunctionEnd
}

export interface PaysLogs { 
    idVehicle: number
    date: Date
    amount: number
    time: number
    id: 0
 }

export interface DetailsVehicleType extends Vehicle {
    listLogsMonth: Array<LogType>,
    listPayLogs: Array<PaysLogs>
}
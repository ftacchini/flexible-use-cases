import { Type } from "flexible-core";
export declare const ExternalPostCondition: <T extends object>(middleware: Type<T>, method: keyof T, { singleton, config }?: {
    singleton?: boolean;
    config?: Partial<T>;
}) => (target: any, property?: any) => void;

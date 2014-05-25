declare var _s: SequelizeModule.SequelizeStatic;

declare module SequelizeModule {
	export interface SequelizeStatic {
		new (database: string, username: string, password?: string, options?: any): Sequelize;

		STRING: any;
		BOOLEAN: any;
	}

	export interface Sequelize {
		define<M, B extends IEntityBase<any /* M */>, T extends ITableBase<any /* M */, any /* B */>>(model: string, configurations: any): T;
	}

	export interface ITableBase<T, EnT extends IEntityBase<any /* T */>> {
		sync(): void;

		build(data: T): EnT;
		find(query: any): IPromiss<EnT>;
		findAll(): IPromiss<T[]>;
		destroy(cond: any): IPromiss<T[]>;
	}

	export interface IEntityBase<T> {
		save(): IPromiss<T>;
		updateAttributes(data: any): IPromiss<IEntityBase<T>>;
	}

	export interface IPromiss<T> {
		success(callback: (result: T) => void): void;
	}
}

declare module "sequelize" {
	export = _s;
}

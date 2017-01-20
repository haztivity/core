/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Core} from "../di";
import {ComponentController} from "./ComponentController";
import {InjectorService} from "../di";
import {
    HaztivityComponentInvalidError,
    HaztivityComponentAlreadyRegisteredError,
    HaztivityComponentNameInvalidError
} from "./Errors";
import {S} from "../utils";
@Core(
    {
        name: "ComponentManager",
        dependencies: [
            InjectorService,
            S
        ]
    }
)
export class ComponentManager {
    //store available components
    protected _components: Map<string,ComponentController> = new Map<string,ComponentController>();

    constructor(protected _Injector: InjectorService, protected _S) {

    }

    /**
     * Añade un componente para poder ser usado en las páginas. El controlador debe extender de ComponentController
     * @param {ComponentController}  component        Controlador del componente. Debe extender de ComponentController y
     * estar registrado en el DI con el tipo Component
     * @see Injector.registerComponent
     */
    public add(component: ComponentController) {
        //component must exists
        if (component) {
            //component must have a name registered by the injector
            let name = (<any>component)._componentName;
            if (!!name) {
                if (this.nameIsValid(name)) {
                    //check if already exists
                    let current = this._components.get(name);
                    //if exists, should be equal
                    if (current != undefined) {
                        if (current != component) {
                            throw new HaztivityComponentAlreadyRegisteredError(name);
                        }
                    } else {
                        //if not exists, register
                        this._components.set(name, component)
                    }
                } else {
                    throw new HaztivityComponentNameInvalidError(name);
                }
            } else {
                throw new HaztivityComponentInvalidError();
            }
        } else {
            throw new HaztivityComponentInvalidError();
        }
    }

    public nameIsValid(name: string): boolean {
        return this._S(name).camelize().s === name;
    }

    public exists(name: string): ComponentController {
        return this._components.get(name) != undefined;
    }

    /**
     * Añade un conjunto de componentes.
     * @see ComponentManager#add
     * @param {ComponentController[]}    components       Componentes a añadir
     */
    public addAll(components: ComponentController[]) {
        for (let component of components) {
            this.add(component);
        }
    }
}


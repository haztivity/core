/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
export abstract class BaseHaztivity{
    protected $inject:String[];

    /**
     * @constructor
     * @description Clase base para todas las clases de Haztivity
     * @param dependencies
     */
    constructor(...dependencies){
        if(this.$inject){
            //if dependencies, register dynamically
            let that = this,
                dependenciesNames = this.$inject;
            for (let dependencieNameIndex = 0, dependenciesNamesLength = dependenciesNames.length; dependencieNameIndex < dependenciesNamesLength; dependencieNameIndex++) {
                let currentDependencieName = dependenciesNames[dependencieNameIndex];
                that[currentDependencieName] = dependencies[dependencieNameIndex];
            }
        }
    }
}
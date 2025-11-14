// Recipe Manager Component
export class Recipe {
    constructor(name, description = '') {
        this.name = name;
        this.description = description;
        this.parameters = new Map();
        this.version = 1;
        this.created = new Date();
        this.modified = new Date();
    }

    set(key, value) {
        this.parameters.set(key, value);
        this.modified = new Date();
    }

    get(key) {
        return this.parameters.get(key);
    }

    has(key) {
        return this.parameters.has(key);
    }

    delete(key) {
        this.parameters.delete(key);
        this.modified = new Date();
    }

    getAll() {
        return Object.fromEntries(this.parameters);
    }

    setAll(params) {
        Object.entries(params).forEach(([key, value]) => {
            this.parameters.set(key, value);
        });
        this.modified = new Date();
    }

    clone(newName) {
        const recipe = new Recipe(newName, this.description);
        recipe.parameters = new Map(this.parameters);
        recipe.version = 1;
        return recipe;
    }

    export() {
        return {
            name: this.name,
            description: this.description,
            parameters: this.getAll(),
            version: this.version,
            created: this.created.toISOString(),
            modified: this.modified.toISOString()
        };
    }

    import(data) {
        this.name = data.name;
        this.description = data.description || '';
        this.setAll(data.parameters || {});
        this.version = data.version || 1;
    }
}

export class RecipeManager {
    constructor() {
        this.recipes = new Map();
        this.activeRecipe = null;
        this.callbacks = [];
    }

    create(name, description = '') {
        if (this.recipes.has(name)) {
            throw new Error(`Recipe "${name}" already exists`);
        }
        const recipe = new Recipe(name, description);
        this.recipes.set(name, recipe);
        return recipe;
    }

    get(name) {
        return this.recipes.get(name);
    }

    delete(name) {
        if (this.activeRecipe?.name === name) {
            this.activeRecipe = null;
        }
        this.recipes.delete(name);
    }

    list() {
        return Array.from(this.recipes.keys());
    }

    activate(name) {
        const recipe = this.recipes.get(name);
        if (!recipe) {
            throw new Error(`Recipe "${name}" not found`);
        }
        this.activeRecipe = recipe;
        this.notify('ACTIVATED', recipe);
        return recipe;
    }

    getActive() {
        return this.activeRecipe;
    }

    clone(sourceName, newName) {
        const source = this.recipes.get(sourceName);
        if (!source) {
            throw new Error(`Recipe "${sourceName}" not found`);
        }
        const clone = source.clone(newName);
        this.recipes.set(newName, clone);
        return clone;
    }

    exportRecipe(name) {
        const recipe = this.recipes.get(name);
        if (!recipe) return null;
        return JSON.stringify(recipe.export(), null, 2);
    }

    importRecipe(jsonString) {
        const data = JSON.parse(jsonString);
        const recipe = new Recipe(data.name);
        recipe.import(data);
        this.recipes.set(recipe.name, recipe);
        return recipe;
    }

    exportAll() {
        const all = Array.from(this.recipes.values()).map(r => r.export());
        return JSON.stringify(all, null, 2);
    }

    importAll(jsonString) {
        const data = JSON.parse(jsonString);
        data.forEach(recipeData => {
            const recipe = new Recipe(recipeData.name);
            recipe.import(recipeData);
            this.recipes.set(recipe.name, recipe);
        });
    }

    onChange(callback) {
        this.callbacks.push(callback);
    }

    notify(event, recipe) {
        this.callbacks.forEach(cb => cb(event, recipe));
    }

    applyToTags(tags) {
        if (!this.activeRecipe) return;

        this.activeRecipe.parameters.forEach((value, key) => {
            tags[key] = value;
        });
    }
}

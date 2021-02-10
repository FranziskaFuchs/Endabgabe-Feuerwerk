namespace Feuerwerk {
    export interface Item {
        name: string;
    }

    export interface Data {
        [category: string]: Item[];
    }

  
}
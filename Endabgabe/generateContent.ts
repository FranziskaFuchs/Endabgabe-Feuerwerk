namespace Feuerwerk{
    export interface Item {
        name: string;
    }

    export interface Data{
        [category: string]: Item[];
    }

    export function generateContent(_data:Data): void{

        for(let category in _data) {
            console.log(category);
        }

    }
     }
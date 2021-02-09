namespace Feuerwerk {
    export interface Item {
        name: string;
    }

    export interface Data {
        [category: string]: Item[];
    }

    export function generateContent(_data: Data): void {

        for (let category in _data) {
            console.log(category);
            let items: Item[] = _data[category];

            let group: HTMLElement | null = null;
            switch (category) {
                case "Explosion":
                    group = createExplosion(category);
                    break;
                case "Lifetime":
                    group = createLifetime( category);
                    break;
                case "BaseColor":
                    group = createBaseColor(category);
                    break

                case "GradientColor":
                    group = createGradientColor( category);
                    break;
                case "ParticleAmount":
                    group = createParticleAmount( category);
                    break;
                case "ParticleForm":
                    group = createParticleForm(category);
                    break;
                case "ParticleSize":
                    group = createParticleSize(category);
                    break;

                default:
                break;

            }
           let fielset: HTMLFieldSetElement | null = document.querySelector("fieldset#"+ category);
            if (fielset && group)
                fielset.appendChild(group);
        }

    }

    export function createExplosion (_category:string):HTMLElement|null{
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _items){
            let radioButton: HTMLInputElement = document.createElement("input");
            let label: HTMLLabelElement = document.createElement("label");
            radioButton.type = "radio";
            radioButton.name = _category;
            radioButton.value = item.name;
            

        }
    }
  
}
Flow:

Step 1:
Først laver man sin html og giver et id til alle de html elementer som man gerne vil ændre/vise.
Fx har vi en tom div men med id'et "products", som gør at vi kan hive fat i den i vores javascript
og ændre indholdet. Det gør man med document.getElementById("products") - (hvor navnet i parantesen her er id'et på elementet)

Step 2:
I js kan vi kalde vores backend/API med fetch metoden.
Fetch metoden returnerer noget data i json format. Data kan være en liste af produkter, en liste af typer/kategorier osv., 
afhængigt af hvilket endpoint vi har kaldt på vores api.

Step 3:
Når vi har fået fat i data fra backenden, skal vi bruge den til at generere nye html elementer som vi kan sætte ind som child elements i
vores html elementer fra step 1.
Fx kan vi i vores products div genere et html element for hvert produkt vi får tilbage fra backenden/API'et og indsætte det generede
element i denne div.

Nye elementer kan genereres med document.createElement("div") fx.
Elementet kan så tilføjes som child element. Fx:

let productsParentDiv = document.getElementById("products");
let childElement = document.createElement("div");
childElement.innerText = "Jeg er en child div");

productsParentDiv.appendChild(childElement);
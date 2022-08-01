const contactOperations = require('./contacts')
const { Command, program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);
const argv = program.opts();

// const contacts = contactOperations.listContacts()
// contacts.then(data => console.log(data))

// console.log(contactOperations.listContacts())

const invokeAction = async ({ action, id, name, email, phone }) => {

    switch (action) {
        case "list":
          const contacts = await contactOperations.listContacts();
          console.table(contacts);
          break;

          case "get":
            const contact = await contactOperations.getContactById(id);
    
            if (!contact) {
              throw new Error(`Contact with id - ${id}, not found.`);
            }
    
            console.log(contact);
            break;
    
          case "add":
            const newContact = await contactOperations.addContact(
              name,
              email,
              phone
            );
            console.log(newContact);
            break;
    
          case "remove":
            const removeContact = await contactOperations.removeContact(id);
            console.log(removeContact);
            break;
    
          default:
            console.log("Unknown action type!");
        }

}

invokeAction(argv);
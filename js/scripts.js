/*

Milestone 1         OK
Replica della grafica con la possibilità di avere messaggi scritti :
    dall’utente (verdi) 
    e dall’interlocutore (bianco) 
        assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: 
tramite la direttiva v-for, visualizzare 
    nome e immagine di ogni contatto

Milestone 2         OK
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare 
    tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3         OK
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa
e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
Risposta dall’interlocutore: ad ogni inserimento di un messaggio, 
l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

Milestone 4         OK
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, 
vengono visualizzati solo i contatti il cui nome contiene le lettere inserite 
(es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

-----------------------------------------------------------------------------------------------
Milestone 5 - opzionale
Cancella messaggio: cliccando sul messaggio appare un menu 
a tendina che permette di cancellare il messaggio selezionato

Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti            OK
-----------------------------------------------------------------------------------------------
Consigli utili:
Si possono trascurare le scrollbar verticali, sia nel pannello dei messaggi, che nella lista dei contatti
I pulsanti e le icone possono non funzionare (a parte l’invio del messaggio)
Per gestire le date, può essere utile la libreria Luxon

*/



// Estraggo la funzione createApp dall'oggetto Vue
const { createApp } = Vue;

// Creo l'istanza di Vue da mondare in pagina
createApp({
    data() {
        return {
            activeChat: 0,
            newMessage: '',
            searchContact: '',
            visibleOptions: {
                index: false,
                open: false,
            },
            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './img/avatar_8.jpg',
                    visible: false,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
        };
    },
    methods: {
        openNewChat(i){
            this.activeChat = i
        },
        addNewMessage(){
            if (this.newMessage.trim().length > 0){
                this.newTimeDate();
                this.contacts[this.activeChat].messages.push(newMsg);
                console.log(newMsg);
                this.newMessage = '';
                setTimeout(() => {
                    this.newTimeDate();
                    const response = 'Ok!';
                    newMsg.message = 'Ok!'
                    newMsg.status = 'received'
                    console.log('si');
                    console.log(newMsg)
                    this.contacts[this.activeChat].messages.push(newMsg)
                }, 2000)
            }
        },
        newTimeDate(){
            const dataOra = new Date();
            const data = dataOra.toLocaleDateString();
            const ora = dataOra.toLocaleTimeString();
            console.log(data, ora)
            return newMsg = {
                date : `${data} ${ora}`,
                message : this.newMessage,
                status : 'sent'
            }
        },
        estractTime(){
            for (let i = 0; i < this.contacts[this.activeChat].messages.length; i++){
            let time = this.contacts[this.activeChat].messages[i].date.split(' ');
            let hours = time[1].split(':');
            let hour = hours[0] + ':' + hours[1];
            let newKey = 'time';
            let newValue = hour;
            let newObj = this.contacts[this.activeChat].messages
            newObj[i][newKey] = newValue
            }
        },
        filterContacts(){
            for (let i = 0; i < this.contacts.length; i++) {
                if (this.contacts[i].name.toLowerCase().includes(this.searchContact)){
                    this.contacts[i].visible = true;
                } else {
                    this.contacts[i].visible = false;
                }
            } 
        },
        optionMessage(i){
            if (this.visibleOptions.index != false && this.visibleOptions.index != i){
                this.visibleOptions.index = false;
                this.visibleOptions.open = false;
            }
            this.visibleOptions.index = i;
            this.visibleOptions.open = (this.visibleOptions.open) ? false : true;
            console.log('prima', this.visibleOptions);
            

        },
        deleteMessage(i){
            this.contacts[this.activeChat].messages.splice(i,1);
            this.visibleOptions.index = false;
            this.visibleOptions.open = false;
            console.log(this.visibleOptions);

        }
    }
  // Monto l'istanza di Vue in pagina
}).mount('#app');

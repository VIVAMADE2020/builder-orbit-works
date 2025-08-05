interface EmailData {
  [key: string]: any;
}

// Mapping des codes pays vers les noms complets
const countryNames: { [key: string]: string } = {
  "AD": "Andorra",
  "AL": "Albania",
  "AT": "Austria",
  "BA": "Bosnia ed Erzegovina",
  "BE": "Belgio",
  "BG": "Bulgaria",
  "BY": "Bielorussia",
  "CH": "Svizzera",
  "CY": "Cipro",
  "CZ": "Repubblica Ceca",
  "DE": "Germania",
  "DK": "Danimarca",
  "EE": "Estonia",
  "ES": "Spagna",
  "FI": "Finlandia",
  "FR": "Francia",
  "GB": "Regno Unito",
  "GR": "Grecia",
  "HR": "Croazia",
  "HU": "Ungheria",
  "IE": "Irlanda",
  "IS": "Islanda",
  "IT": "Italia",
  "LI": "Liechtenstein",
  "LT": "Lituania",
  "LU": "Lussemburgo",
  "LV": "Lettonia",
  "MC": "Monaco",
  "MD": "Moldavia",
  "ME": "Montenegro",
  "MK": "Macedonia del Nord",
  "MT": "Malta",
  "NL": "Paesi Bassi",
  "NO": "Norvegia",
  "PL": "Polonia",
  "PT": "Portogallo",
  "RO": "Romania",
  "RS": "Serbia",
  "RU": "Russia",
  "SE": "Svezia",
  "SI": "Slovenia",
  "SK": "Slovacchia",
  "SM": "San Marino",
  "UA": "Ucraina",
  "VA": "Città del Vaticano"
};

function getCountryFullName(countryCode: string): string {
  return countryNames[countryCode] || countryCode || "Non specificato";
}

export const sendFormSubmitEmail = async (
  data: EmailData,
  formType: string,
): Promise<boolean> => {
  try {
    console.log("📧 Envoi via FormSubmit.co...");

    // Préparer les données pour FormSubmit
    const formData = new FormData();

    // Configuration FormSubmit
    formData.append("_to", "contatto@soluzionerapida.com");
    formData.append("_subject", getEmailSubject(data, formType));
    formData.append("_template", "table"); // Template propre et organisé
    formData.append("_captcha", "false"); // Pas de captcha
    formData.append("_next", window.location.origin + "/success"); // Page de confirmation

    // Ajouter les données communes
    formData.append("Type_Formulaire", formType);
    formData.append("Nome_Completo", `${data.nome} ${data.cognome}`);
    formData.append("Email", data.email);
    formData.append("Telefono", data.telefono || "Non fornito");
    formData.append("WhatsApp", data.whatsapp || "Non fornito");
    formData.append("Paese", getCountryFullName(data.paese));
    formData.append("Data_Invio", new Date().toLocaleString("it-IT"));

    // Données spécifiques selon le type de formulaire
    if (formType === "loan-request") {
      formData.append("Data_Nascita", data.dataNascita || "Non fornita");
      formData.append("Indirizzo", data.indirizzo || "Non fornito");
      formData.append("Tipo_Prestito", data.tipoPrestito);
      formData.append(
        "Importo_Richiesto",
        `€${parseInt(data.importo).toLocaleString()}`,
      );
      formData.append("Durata_Prestito", `${data.durata} mesi`);
      formData.append("Motivazione", data.motivazione || "Non specificata");
      formData.append("Occupazione", data.occupazione);
      formData.append(
        "Reddito_Mensile",
        `€${parseInt(data.redditoMensile).toLocaleString()}`,
      );

      // Calcoli se disponibili
      if (data.calculations) {
        formData.append(
          "Rata_Mensile_Stimata",
          `€${data.calculations.monthlyPayment?.toLocaleString()}`,
        );
        formData.append(
          "Totale_da_Restituire",
          `€${data.calculations.totalPayment?.toLocaleString()}`,
        );
        formData.append(
          "Interessi_Totali",
          `€${data.calculations.totalInterest?.toLocaleString()}`,
        );
      }

      formData.append(
        "Messaggio_Aggiuntivo",
        data.messaggio || "Nessun messaggio",
      );
      formData.append(
        "Consenso_Privacy",
        data.consensoPrivacy ? "Autorizzato" : "Non autorizzato",
      );
      formData.append(
        "Consenso_Marketing",
        data.consensoMarketing ? "Autorizzato" : "Non autorizzato",
      );
    } else {
      // Formulaire de contact
      formData.append("Oggetto_Richiesta", data.oggetto);
      formData.append("Messaggio", data.messaggio);
      // Le pays est déjà ajouté en nom complet dans la section commune
    }

    console.log("📧 Invio a FormSubmit.co...");

    // Envoyer via FormSubmit.co
    const response = await fetch(
      "https://formsubmit.co/contatto@soluzionerapida.com",
      {
        method: "POST",
        body: formData,
      },
    );

    if (response.ok) {
      console.log("✅ Email inviato con successo via FormSubmit.co");
      return true;
    } else {
      console.error("❌ Erreur FormSubmit.co:", response.status);
      return false;
    }
  } catch (error) {
    console.error("❌ Erreur service FormSubmit:", error);
    return false;
  }
};

function getEmailSubject(data: any, formType: string): string {
  if (formType === "loan-request") {
    return `RICHIESTA PRESTITO - ${data.nome} ${data.cognome} - EUR ${parseInt(data.importo).toLocaleString()}`;
  } else {
    return `CONTATTO - ${data.oggetto} - ${data.nome} ${data.cognome}`;
  }
}

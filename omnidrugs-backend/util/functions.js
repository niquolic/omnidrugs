export function extractMedicineName(text) {
  const knownMeds = [
    'ibuprofène', 'amoxicilline', 'aspirine', 'omeprazole',
    'loratadine', 'ciprofloxacine', 'metformine', 'simvastatine', 'lisinopril',
    'doliprane', 'dafalgan', 'spasfon', 'strepsils'
  ];
  const lowerText = text.toLowerCase();
  for (const med of knownMeds) {
    if (lowerText.includes(med)) {
      return med;
    }
  }
  return null;
}

export async function searchMedsFromText(text) {
  const query = `
    query {
      medicaments(denomination: { contains_all: ["${text}"] },limit: 1) {
        denomination
        titulaires
        conditions_prescription
        forme_pharmaceutique
        voies_administration
        substances {
          denominations
          dosage_substance
        }
      }
    }
  `;

  const response = await fetch('https://api-bdpm-graphql.axel-op.fr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
    },
    body: query,
  })

  const json = await response.json();
  return json.data?.medicaments || [];
}
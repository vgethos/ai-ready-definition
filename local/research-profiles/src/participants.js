import { parse } from 'csv-parse/sync';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

/**
 * Compute the expected transcript filename for a participant.
 * Format: first name lowercase + last name first letter lowercase + ".txt"
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string}
 */
function transcriptFilename(firstName, lastName) {
  return `${firstName.toLowerCase()}${lastName[0].toLowerCase()}.txt`;
}

/**
 * Load and parse participant data from the CSV export.
 *
 * Handles duplicate column headers in the CSV (the insurance-related questions
 * appear twice). csv-parse with `columns: true` overwrites earlier values with
 * later ones for duplicate headers, so the second (correct) set wins automatically.
 *
 * Also handles rows with fewer columns than the header via `relax_column_count`.
 *
 * @param {string} csvPath — absolute path to the participant CSV file
 * @returns {Promise<Array<Object>>} array of cleaned participant objects
 */
export async function loadParticipants(csvPath) {
  const csv = readFileSync(csvPath, 'utf-8');
  const records = parse(csv, {
    columns: true,
    relax_column_count: true,
    skip_empty_lines: true,
  });

  const transcriptsDir = join(dirname(csvPath), 'transcripts');

  return records.map((row) => {
    const firstName = row['First Name'] || '';
    const lastName = row['Last Name'] || '';
    const expectedFile = transcriptFilename(firstName, lastName);
    const transcriptExists = existsSync(join(transcriptsDir, expectedFile));

    return {
      id: `${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      age: parseInt(row['Age'], 10) || null,
      gender: row['Gender'] || '',
      occupation: row['Occupation'] || '',
      income: row['Household income in USD'] || '',
      maritalStatus: row['Marital status'] || '',
      livingWith: row['Living situation'] || '',
      education: row['Level of education'] || '',
      neighborhoodType: row['Neighborhood type'] || '',
      region: row['Region'] || '',
      hasLifeInsurance:
        row[
          'Do you currently have life insurance? Pick the option that fits best.'
        ] || '',
      coverageAmount:
        row[
          'How much life insurance coverage do you currently have as an individual?'
        ] || '',
      policiesConsidering:
        row[
          'What type(s) of life insurance policies are you considering purchasing in the next year?'
        ] || '',
      researchApproach:
        row[
          'How, if at all, have you been doing research to inform your decision about which insurance policies are best for you?'
        ] || '',
      providersHeardOf:
        row[
          'Which of the following life insurance providers have you heard of before?'
        ] || '',
      transcriptFile: transcriptExists ? expectedFile : null,
    };
  });
}

/**
 * Get the full absolute path to a participant's transcript file.
 * @param {Object} participant — a participant object from loadParticipants()
 * @param {string} baseDir — the directory containing the transcripts/ folder
 * @returns {string|null} absolute path, or null if no transcript is available
 */
export function getTranscriptPath(participant, baseDir) {
  if (!participant.transcriptFile) {
    return null;
  }
  return resolve(baseDir, 'transcripts', participant.transcriptFile);
}

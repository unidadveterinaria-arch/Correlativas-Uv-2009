import { Subject, SubjectState, ViewMode, StudentProgress, SubjectEvaluation } from '../types';

export const SUBJECTS: Subject[] = [
  // --- 1er AÑO ---
  { code: '1.1.1', name: 'Física Biológica', year: 1, prerequisites: [], rawPrereqsText: '-' },
  { code: '1.2.1', name: 'Química Biológica I', year: 1, prerequisites: [], rawPrereqsText: '-' },
  { code: '1.3.1', name: 'Biología y Ecología', year: 1, prerequisites: [], rawPrereqsText: '-' },
  { code: '1.4.1', name: 'Metodología de la Investigación', year: 1, prerequisites: [], rawPrereqsText: '-' },
  { code: '1.5.2', name: 'Anatomía Descriptiva y Comparada I', year: 1, prerequisites: [], rawPrereqsText: '-' },
  { code: '1.6.2', name: 'Histología I y Embriología Básica', year: 1, prerequisites: ['1.1.1', '1.2.1', '1.3.1'], rawPrereqsText: '1.1.1 a 1.3.1' },
  { code: '1.7.2', name: 'Química Biológica II', year: 1, prerequisites: ['1.1.1', '1.2.1'], rawPrereqsText: '1.1.1 – 1.2.1' },

  // --- 2do AÑO ---
  { code: '2.8.1', name: 'Anatomía Descriptiva y Comparada II', year: 2, prerequisites: ['1.3.1', '1.5.2', '1.6.2'], rawPrereqsText: '1.3.1 - 1.5.2 - 1.6.2' },
  { code: '2.9.1', name: 'Histología II y Embriología Especial', year: 2, prerequisites: ['1.6.2', '1.7.2'], rawPrereqsText: '1.6.2 - 1.7.2' },
  { code: '2.10.1', name: 'Zootecnia General', year: 2, prerequisites: ['1.3.1', '1.5.2'], rawPrereqsText: '1.3.1 - 1.5.2' },
  { code: '2.11.1', name: 'Bioestadística', year: 2, prerequisites: ['1.3.1', '1.4.1'], rawPrereqsText: '1.3.1 - 1.4.1' },
  { code: '2.12', name: 'Fisiología', year: 2, prerequisites: ['2.8.1', '2.9.1'], rawPrereqsText: '2.8.1 - 2.9.1' },
  { code: '2.13.2', name: 'Genética', year: 2, prerequisites: ['1.6.2', '2.11.1'], rawPrereqsText: '1.6.2 - 2.11.1' },
  { code: '2.14.2', name: 'Microbiología', year: 2, prerequisites: ['1.5.2', '2.9.1'], rawPrereqsText: '1.5.2 - 2.9.1' },
  { code: '2.15.2', name: 'Parasitología Veterinaria', year: 2, prerequisites: ['2.8.1', '2.9.1'], rawPrereqsText: '2.8.1 - 2.9.1' },

  // --- 3er AÑO ---
  { code: '3.16.1', name: 'Inmunología', year: 3, prerequisites: ['2.12', '2.13.2', '2.14.2', '2.15.2'], rawPrereqsText: '2.12 a 2.15.2' },
  { code: '3.17.1', name: 'Epidemiología', year: 3, prerequisites: ['2.10.1', '2.11.1', '2.14.2', '2.15.2'], rawPrereqsText: '2.10.1 - 2.11.1 - 2.14.2 - 2.15.2' },
  { code: '3.18.1', name: 'Semiología y Análisis Clínicos', year: 3, prerequisites: ['1.4.1', '2.10.1', '2.12'], rawPrereqsText: '1.4.1 - 2.10.1 - 2.12' },
  { code: '3.19.1', name: 'Patología General Veterinaria', year: 3, prerequisites: ['2.12', '2.14.2', '2.15.2'], rawPrereqsText: '2.12 - 2.14.2 - 2.15.2' },
  { code: '3.20.2', name: 'Farmacología y Terapéutica', year: 3, prerequisites: ['2.12', '2.14.2', '2.15.2'], rawPrereqsText: '2.12 - 2.14.2 - 2.15.2' },
  { code: '3.21.2', name: 'Sociología Rural, Agroecología y Extensión', year: 3, prerequisites: ['1.3.1', '1.4.1'], rawPrereqsText: '1.3.1 - 1.4.1' },
  { code: '3.22.2', name: 'Patología Especial Veterinaria', year: 3, prerequisites: ['3.16.1', '3.19.1'], rawPrereqsText: '3.16.1 - 3.19.1' },
  { code: '3.23.2', name: 'Cirugía I', year: 3, prerequisites: ['3.18.1'], rawPrereqsText: '3.18.1' },
  { code: '3.24.2', name: 'Inglés I', year: 3, prerequisites: [], rawPrereqsText: '-' },

  // --- 4to AÑO ---
  { code: '4.25.1', name: 'Enfermedades Parasitarias', year: 4, prerequisites: ['3.17.1', '3.18.1', '3.20.2', '3.22.2'], rawPrereqsText: '3.17.1 - 3.18.1 - 3.20.2 - 3.22.2' },
  { code: '4.26.1', name: 'Enfermedades Infecciosas', year: 4, prerequisites: ['3.17.1', '3.20.2', '3.22.2'], rawPrereqsText: '3.17.1 - 3.20.2 - 3.22.2' },
  { code: '4.27.1', name: 'Cirugía II', year: 4, prerequisites: ['3.23.2'], rawPrereqsText: '3.23.2' },
  { code: '4.28.1', name: 'Nutrición Animal', year: 4, prerequisites: ['2.10.1', '3.19.1'], rawPrereqsText: '2.10.1 - 3.19.1' },
  { code: '4.29.1', name: 'Inglés II', year: 4, prerequisites: ['3.24.2'], rawPrereqsText: '3.24.2' },
  { code: '4.30.2', name: 'Patología Médica', year: 4, prerequisites: ['4.25.1', '4.26.1'], rawPrereqsText: '4.25.1 - 4.26.1' },
  { code: '4.31.2', name: 'Patología Quirúrgica', year: 4, prerequisites: ['4.25.1', '4.26.1', '4.27.1'], rawPrereqsText: '4.25.1 - 4.26.1 - 4.27.1' },
  { code: '4.32.2', name: 'Obstetricia y Fisiopatología de la Reproducción', year: 4, prerequisites: ['4.25.1', '4.26.1', '4.27.1', '4.28.1'], rawPrereqsText: '4.25.1 a 4.28.1' },
  { code: '4.33.2', name: 'Ética y Legislación Veterinaria', year: 4, prerequisites: ['3.17.1', '3.18.1', '3.19.1', '3.21.2'], rawPrereqsText: '3.17.1 a 3.19.1 - 3.21.2' },
  { code: '4.34.2', name: 'Sueros y Vacunas', year: 4, prerequisites: ['4.26.1'], rawPrereqsText: '4.26.1' },

  // --- 5to AÑO ---
  { code: '5.35.1', name: 'Agrostología', year: 5, prerequisites: ['3.21.2', '4.28.1', '4.30.2'], rawPrereqsText: '3.21.2 - 4.28.1 - 4.30.2' },
  { code: '5.36.1', name: 'Economía Agraria y Administración Rural', year: 5, prerequisites: ['4.33.2'], rawPrereqsText: '4.33.2' },
  { code: '5.37.1', name: 'Producción de Porcinos y Pequeños Rumiantes', year: 5, prerequisites: ['4.28.1', '4.30.2', '4.32.2', '4.34.2'], rawPrereqsText: '4.28.1 - 4.30.2 - 4.32.2 - 4.34.2' },
  { code: '5.38.1', name: 'Producción de Aves y Pilíferos', year: 5, prerequisites: ['4.28.1', '4.30.2', '4.33.2', '4.34.2'], rawPrereqsText: '4.28.1 - 4.30.2 - 4.33.2 - 4.34.2' },
  { code: '5.39.1', name: 'Medicina Veterinaria, Manejo y Conservación de Fauna Silvestre', year: 5, prerequisites: ['4.28.1', '4.30.2', '4.31.2', '4.33.2', '4.34.2'], rawPrereqsText: '4.28.1 - 4.30.2 - 4.31.2 - 4.33.2 - 4.34.2' },
  { code: '5.40.1', name: 'Higiene y Microbiología de los Alimentos', year: 5, prerequisites: ['4.25.1', '4.26.1'], rawPrereqsText: '4.25.1 - 4.26.1' },
  { code: '5.41.2', name: 'Producción de Bovinos Lecheros', year: 5, prerequisites: ['4.28.1', '4.30.2', '4.32.2', '4.33.2', '4.34.2', '5.35.1', '5.36.1'], rawPrereqsText: '4.28.1 - 4.30.2 - 4.32.2 a 5.36.1' },
  { code: '5.42.2', name: 'Producción de Bovinos para Carne', year: 5, prerequisites: ['4.28.1', '4.30.2', '4.32.2', '4.33.2', '4.34.2', '5.35.1', '5.36.1'], rawPrereqsText: '4.28.1 - 4.30.2 - 4.32.2 a 5.36.1' },
  { code: '5.43.2', name: 'Salud Pública: Epidemiología, Saneamiento, Educación y Administración', year: 5, prerequisites: ['4.25.1', '4.26.1', '4.33.2', '4.34.2'], rawPrereqsText: '4.25.1 - 4.26.1 - 4.33.2 - 4.34.2' },
  { code: '5.44.2', name: 'Tecnología de los Alimentos de Origen Animal', year: 5, prerequisites: ['4.30.2', '4.31.2', '5.40.1'], rawPrereqsText: '4.30.2 - 4.31.2 - 5.40.1' },
  { code: '5.45.2', name: 'Producción Equina', year: 5, prerequisites: ['4.28.1', '4.30.2', '4.32.2', '4.33.2', '4.34.2'], rawPrereqsText: '4.28.1 - 4.30.2 - 4.32.2 a 4.34.2' },

  // --- 6to AÑO ---
  { code: '6.46.1', name: 'Clínica de Animales de Compañía', year: 6, prerequisites: ['4.30.2', '4.31.2', '4.32.2', '4.33.2', '4.34.2'], rawPrereqsText: '4.30.2 a 4.34.2' },
  { code: '6.47.1', name: 'Clínica Médica y Quirúrgica de Grandes Animales', year: 6, prerequisites: ['4.30.2', '4.31.2', '4.32.2', '4.33.2', '4.34.2', '5.35.1', '5.36.1', '5.37.1', '5.41.2', '5.42.2', '5.45.2'], rawPrereqsText: '4.30.2 a 5.37.1 - 5.41.2 - 5.42.2 - 5.45.2' },
  { 
    code: '6.48.1', 
    name: 'Ciclo de Orientación', 
    year: 6, 
    // Requires all preceding subjects (1.1.1 through 6.47.1)
    prerequisites: [
      '1.1.1', '1.2.1', '1.3.1', '1.4.1', '1.5.2', '1.6.2', '1.7.2',
      '2.8.1', '2.9.1', '2.10.1', '2.11.1', '2.12', '2.13.2', '2.14.2', '2.15.2',
      '3.16.1', '3.17.1', '3.18.1', '3.19.1', '3.20.2', '3.21.2', '3.22.2', '3.23.2', '3.24.2',
      '4.25.1', '4.26.1', '4.27.1', '4.28.1', '4.29.1', '4.30.2', '4.31.2', '4.32.2', '4.33.2', '4.34.2',
      '5.35.1', '5.36.1', '5.37.1', '5.38.1', '5.39.1', '5.40.1', '5.41.2', '5.42.2', '5.43.2', '5.44.2', '5.45.2',
      '6.46.1', '6.47.1'
    ], 
    rawPrereqsText: '1.1.1 a 6.47.1' 
  }
];

export const SUBJECT_MAP = new Map<string, Subject>(
  SUBJECTS.map((s) => [s.code, s])
);

export function getSubjectByCode(code: string): Subject | undefined {
  return SUBJECT_MAP.get(code);
}

export function isSubjectEnabled(
  subject: Subject,
  progress: StudentProgress,
  mode: ViewMode
): { isEnabled: boolean; missingPrereqs: Subject[]; completedPrereqs: Subject[] } {
  if (subject.prerequisites.length === 0) {
    return { isEnabled: true, missingPrereqs: [], completedPrereqs: [] };
  }

  const missingPrereqs: Subject[] = [];
  const completedPrereqs: Subject[] = [];

  for (const reqCode of subject.prerequisites) {
    const reqSubject = SUBJECT_MAP.get(reqCode);
    if (!reqSubject) continue;

    const state = progress[reqCode] || 'pendiente';

    // Criteria:
    // For mode = 'rendir': state must be 'aprobada'
    // For mode = 'cursar': state must be 'regular' OR 'aprobada'
    const isMet = mode === 'rendir' ? state === 'aprobada' : (state === 'regular' || state === 'aprobada');

    if (isMet) {
      completedPrereqs.push(reqSubject);
    } else {
      missingPrereqs.push(reqSubject);
    }
  }

  return {
    isEnabled: missingPrereqs.length === 0,
    missingPrereqs,
    completedPrereqs,
  };
}

export function getUnlockedSubjects(subjectCode: string): Subject[] {
  return SUBJECTS.filter((s) => s.prerequisites.includes(subjectCode));
}

export function evaluateAllSubjects(
  progress: StudentProgress,
  mode: ViewMode
): Map<string, SubjectEvaluation> {
  const result = new Map<string, SubjectEvaluation>();

  for (const subject of SUBJECTS) {
    const state = progress[subject.code] || 'pendiente';
    const { isEnabled, missingPrereqs, completedPrereqs } = isSubjectEnabled(subject, progress, mode);
    const unlocksSubjects = getUnlockedSubjects(subject.code);

    result.set(subject.code, {
      subject,
      state,
      isEnabled,
      missingPrereqs,
      completedPrereqs,
      unlocksSubjects,
    });
  }

  return result;
}

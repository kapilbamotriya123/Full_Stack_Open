import diagnoseEntries from '../../data/diagnoses';
import { DiagnoseEntry } from '../../types';

export const getDiagnoseEntries = (): DiagnoseEntry[]  => {
    return diagnoseEntries;
};


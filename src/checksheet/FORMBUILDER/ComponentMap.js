import A4Paper from '../../components/UIcomponent/A4Paper';
import A4blank from '../../components/PageComponent/A4blank';
import CoverPage from '../../pages/CoverPage';
import CompactImageUpload from '../../components/FormComponents/CompactImageUpload';
import EDWFinalRecordCutting from '../../components/FormComponents/EDWFinalRecordCutting';
import EDWFinalRoughnessCheck from '../../components/FormComponents/EDWFinalRoughnessCheck';
import EDWFinalSizeRecord from '../../components/FormComponents/EDWFinalSizeRecord';
import EquationBox from '../../components/FormComponents/EquationBox';
import FinalConditionTable from '../../components/FormComponents/FinalConditionTable';
import FinalEDWwireCheck from '../../components/FormComponents/FinalEDWwireCheck';
import FormCeramicCheckEDM from '../../components/FormComponents/FormCeramicCheckEDM';
import FormCeramicCheckEDW from '../../components/FormComponents/FormCeramicCheckEDW';
import FormCheckedBox from '../../components/FormComponents/FormCheckedBox';
import FormChecknumber from '../../components/FormComponents/FormChecknumber';
import FormDateInput from '../../components/FormComponents/FormDateInput';
import FormDoubleCheckTable from '../../components/FormComponents/FormDoubleCheckTable';
import FormEDMBodyCheckTable from '../../components/FormComponents/FormEDMBodyCheckTable';
import FormEDMCoilMagnetCheck from '../../components/FormComponents/FormEDMCoilMagnetCheck';
import FormEDMCoilTubeCheck from '../../components/FormComponents/FormEDMCoilTubeCheck';
import FormEDMLevelCeramic from '../../components/FormComponents/FormEDMLevelCeramic';
import FormEDMTablePitchingX from '../../components/FormComponents/FormEDMTablePitchingX';
import FormEDMTablePitchingY from '../../components/FormComponents/FormEDMTablePitchingY';
import FormEDMTableRollingX from '../../components/FormComponents/FormEDMTableRollingX';
import FormEDMTableRollingY from '../../components/FormComponents/FormEDMTableRollingY';
import FormEDMTableStraightness from '../../components/FormComponents/FormEDMTableStraightness';
import FormEDMYawingX from '../../components/FormComponents/FormEDMYawingX';
import FormEDMYawingY from '../../components/FormComponents/FormEDMYawingY';
import FormEDMparallelX from '../../components/FormComponents/FormEDMparallelX';
import FormEDMparallelY from '../../components/FormComponents/FormEDMparallelY';
import FormEDWVersionCheck from '../../components/FormComponents/FormEDWVersionCheck';
import FormEDWYawingX from '../../components/FormComponents/FormEDWYawingX';
import FormHorizontalTableSingleRow from '../../components/FormComponents/FormHorizontalTableSingleRow';
import FormInputCheckSTD from '../../components/FormComponents/FormInputCheckSTD';
import FormItemCheck from '../../components/FormComponents/FormItemCheck';
import FormLevelTableWithDirections from '../../components/FormComponents/FormLevelTableWithDirections';
import FormLevelTableXAB from '../../components/FormComponents/FormLevelTableXAB';
import FormLevelTableXStdAct from '../../components/FormComponents/FormLevelTableXStdAct';
import FormLevelTableYAB from '../../components/FormComponents/FormLevelTableYAB';
import FormQuickTable from '../../components/FormComponents/FormQuickTable';
import FormSQRgrapX from '../../components/FormComponents/FormSQRgrapX';
import FormSquareCheckGraph from '../../components/FormComponents/FormSquareCheckGraph';
import FormSquareCheckSQRGraph from '../../components/FormComponents/FormSquareCheckSQRGraph';
import FormStartFinishTime from '../../components/FormComponents/FormStartFinishTime';
import FormStoneTableGrid from '../../components/FormComponents/FormStoneTableGrid';
import FormTableEnto from '../../components/FormComponents/FormTableEnto';
import FormTableEntoDual from '../../components/FormComponents/FormTableEntoDual';
import FormTableEntoSingleDir from '../../components/FormComponents/FormTableEntoSingleDir';
import FormTablePitchCheck from '../../components/FormComponents/FormTablePitchCheck';
import FormTablePitchXYZUV from '../../components/FormComponents/FormTablePitchXYZUV';
import FormTablePitchXYZUVBigmodel from '../../components/FormComponents/FormTablePitchXYZUVBigmodel';
import FormTablePitchingX from '../../components/FormComponents/FormTablePitchingX';
import FormTablePitchingY from '../../components/FormComponents/FormTablePitchingY';
import FormTableRollingX from '../../components/FormComponents/FormTableRollingX';
import FormTableRollingY from '../../components/FormComponents/FormTableRollingY';
import FormTableStraightness from '../../components/FormComponents/FormTableStraightness';
import FormTableXABDIFF from '../../components/FormComponents/FormTableXABDIFF';
import FormTableXPR from '../../components/FormComponents/FormTableXPR';
import FormTableYABDIFF from '../../components/FormComponents/FormTableYABDIFF';
import FormTableYPR from '../../components/FormComponents/FormTableYPR';
import FormValidatedCell from '../../components/FormComponents/FormValidatedCell';
import FormWorkstandCheck from '../../components/FormComponents/FormWorkstandCheck';
import FormYawingUV from '../../components/FormComponents/FormYawingUV';
import FormYawingY from '../../components/FormComponents/FormYawingY';
import ImageUploadBox from '../../components/FormComponents/ImageUploadBox';
import InputWithArrow from '../../components/FormComponents/InputWithArrow';
import ShapedCheckGroup from '../../components/FormComponents/ShapedCheckGroup';
import TableCalculateSetting from '../../components/FormComponents/TableCalculateSetting';

import PureGrid from './PureGrid';

export const ComponentMap = {
    PureGrid,
    A4Paper,
    A4blank,
    CoverPage,
    CompactImageUpload,
    EDWFinalRecordCutting,
    EDWFinalRoughnessCheck,
    EDWFinalSizeRecord,
    EquationBox,
    FinalConditionTable,
    FinalEDWwireCheck,
    FormCeramicCheckEDM,
    FormCeramicCheckEDW,
    FormCheckedBox,
    FormChecknumber,
    FormDateInput,
    FormDoubleCheckTable,
    FormEDMBodyCheckTable,
    FormEDMCoilMagnetCheck,
    FormEDMCoilTubeCheck,
    FormEDMLevelCeramic,
    FormEDMTablePitchingX,
    FormEDMTablePitchingY,
    FormEDMTableRollingX,
    FormEDMTableRollingY,
    FormEDMTableStraightness,
    FormEDMYawingX,
    FormEDMYawingY,
    FormEDMparallelX,
    FormEDMparallelY,
    FormEDWVersionCheck,
    FormEDWYawingX,
    FormHorizontalTableSingleRow,
    FormInputCheckSTD,
    FormItemCheck,
    FormLevelTableWithDirections,
    FormLevelTableXAB,
    FormLevelTableXStdAct,
    FormLevelTableYAB,
    FormQuickTable,
    FormSQRgrapX,
    FormSquareCheckGraph,
    FormSquareCheckSQRGraph,
    FormStartFinishTime,
    FormStoneTableGrid,
    FormTableEnto,
    FormTableEntoDual,
    FormTableEntoSingleDir,
    FormTablePitchCheck,
    FormTablePitchXYZUV,
    FormTablePitchXYZUVBigmodel,
    FormTablePitchingX,
    FormTablePitchingY,
    FormTableRollingX,
    FormTableRollingY,
    FormTableStraightness,
    FormTableXABDIFF,
    FormTableXPR,
    FormTableYABDIFF,
    FormTableYPR,
    FormValidatedCell,
    FormWorkstandCheck,
    FormYawingUV,
    FormYawingY,
    ImageUploadBox,
    InputWithArrow,
    ShapedCheckGroup,
    TableCalculateSetting,
};

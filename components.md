# 🧩 Component Encyclopedia: Complete Form & Measurement Library

This document provides exhaustive, individual documentation for every component in `src/components/FormComponents`. Each entry includes its purpose, a detailed prop table, tech logic, and 5 unique code examples.

## 📋 Table of Contents
| 1-15 | 16-30 | 31-45 | 46-63 |
| :--- | :--- | :--- | :--- |
| 1. [CompactImageUpload](#-1-compactimageupload) | 16. [FormEDMCoilTubeCheck](#-16-formedmcoiltubecheck) | 31. [FormItemCheck](#-31-formitemcheck) | 46. [FormTablePitchXYZUVBigmodel](#-46-formtablepitchxyzuvbigmodel) |
| 2. [EDWFinalRecordCutting](#-2-edwfinalrecordcutting) | 17. [FormEDMLevelCeramic](#-17-formedmlevelceramic) | 32. [FormLevelTableWithDirections](#-32-formleveltablewithdirections) | 47. [FormTablePitchingX](#-47-formtablepitchingx) |
| 3. [EDWFinalRoughnessCheck](#-3-edwfinalroughnesscheck) | 18. [FormEDMTablePitchingX](#-18-formedmtablepitchingx) | 33. [FormLevelTableXAB](#-33-formleveltablexab) | 48. [FormTablePitchingY](#-48-formtablepitchingy) |
| 4. [FormChecknumber](#-4-formchecknumber) | 19. [FormEDMTablePitchingY](#-19-formedmtablepitchingy) | 34. [FormLevelTableXStdAct](#-34-formleveltablexstdact) | 49. [FormTableRollingX](#-49-formtablerollingx) |
| 5. [FormCheckedBox](#-5-formcheckedbox) | 20. [FormEDMTableRollingX](#-20-formedmtablerollingx) | 35. [FormLevelTableYAB](#-35-formleveltableyab) | 50. [FormTableRollingY](#-50-formtablerollingy) |
| 6. [FormCheckedBoxWithStandard](#-6-formcheckedboxwithstandard) | 21. [FormEDMTableRollingY](#-21-formedmtablerollingy) | 36. [FormQuickTable](#-36-formquicktable) | 51. [FormTableStraightness](#-51-formtablestraightness) |
| 7. [FormCheckedBoxWithStandardCol](#-7-formcheckedboxwithstandardcol) | 22. [FormEDMTableStraightness](#-22-formedmtablestraightness) | 37. [FormSQRgrapX](#-37-formsqrgrapx) | 52. [FormTableXABDIFF](#-52-formtablexabdiff) |
| 8. [FormCheckedInput](#-8-formcheckedinput) | 23. [FormEDMYawingX](#-23-formedmyawingx) | 38. [FormSquareCheckGraph](#-38-formsquarecheckgraph) | 53. [FormTableXPR](#-53-formtablexpr) |
| 9. [FormCheckboxGroupFixed](#-9-formcheckboxgroupfixed) | 24. [FormEDMYawingY](#-24-formedmyawingy) | 39. [FormSquareCheckSQRGraph](#-39-formsquarechecksqrgraph) | 54. [FormTableYABDIFF](#-54-formtableyabdiff) |
| 10. [FormChecknumberWithDefault](#-10-formchecknumberwithdefault) | 25. [FormEDMparallelX](#-25-formedmparallelx) | 40. [FormStartFinishTime](#-40-formstartfinishtime) | 55. [FormTableYPR](#-55-formtableypr) |
| 11. [FormChecknumberWithStandard](#-11-formchecknumberwithstandard) | 26. [FormEDMparallelY](#-26-formedmparallely) | 41. [FormStoneTableGrid](#-41-formstonetablegrid) | 56. [FormValidatedCell](#-56-formvalidatedcell) |
| 12. [FormContainer](#-12-formcontainer) | 27. [FormEDWVersionCheck](#-27-formedwversioncheck) | 42. [FormTableEnto](#-42-formtableento) | 57. [FormWorkstandCheck](#-57-formworkstandcheck) |
| 13. [FormDoubleCheckTable](#-13-formdoublechecktable) | 28. [FormEDWYawingX](#-28-formedwyawingx) | 43. [FormTableEntoDual](#-43-formtableentodual) | 58. [FormYawingUV](#-58-formyawinguv) |
| 14. [FormEDMBodyCheckTable](#-14-formedmbodychecktable) | 29. [FormHorizontalTableSingleRow](#-29-formhorizontaltablesinglerow) | 44. [FormTablePitchCheck](#-44-formtablepitchcheck) | 59. [FormYawingY](#-59-formyawingy) |
| 15. [FormEDMCoilMagnetCheck](#-15-formedmcoilmagnetcheck) | 30. [FormInputCheckSTD](#-30-forminputcheckstd) | 45. [FormTablePitchXYZUV](#-45-formtablepitchxyzuv) | 60. [ImageUploadBox](#-60-imageuploadbox) |
| | | | 61. [InputWithArrow](#-61-inputwitharrow) |
| | | | 62. [ShapedCheckGroup](#-62-shapedcheckgroup) |
| | | | 63. [TableCalculateSetting](#-63-tablecalculatesetting) |

---

## 📸 1. `CompactImageUpload`
**Purpose**: A space-saving button that manages image uploads, client-side resizing, and modal viewing. It displays "ภาพ" instead of the image thumbnail to keep the layout clean.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name to store the filename/File object. |
| `apiEndpoint` | `string` | `undefined` | Base URL for API calls. |
| `uploadPath` | `string` | `'/upload/assy'` | Endpoint path for POSTing the image. |
| `uploadFolder` | `string` | `'assy_problem'` | Folder name on the server for constructing the view URL. |
| `label` | `string` | `"เพิ่มภาพ"` | Text shown on the button when no image is uploaded. |
| `viewLabel` | `string` | `"ภาพ"` | Text shown on the button when an image exists. |
| `deferred` | `boolean` | `false` | If `true`, stores the `File` object in RHF instead of uploading immediately. |
| `extraData` | `Object` | `{}` | Additional key-value pairs to send in the `FormData` (e.g., machine IDs). |
| `className` | `string` | `""` | Custom CSS classes for the container. |

### 🧠 Technical Logic
- **Resizing**: Automatically resizes images to a maximum width of 1200px using the Canvas API before uploading.
- **Server Sync**: Deletes the old file from the server automatically when a new one is uploaded or removed.
- **State Management**: Uses RHF `useWatch` to track current value and display either the "Upload" or "View" state.

### 📝 Code Examples
1. **Basic Upload**:
   ```jsx
   <CompactImageUpload name="p1_photo" apiEndpoint={api} />
   ```
2. **Custom Labels**:
   ```jsx
   <CompactImageUpload name="qc_check" label="Take Photo" viewLabel="View Photo" />
   ```
3. **Deferred Mode (Upload Later)**:
   ```jsx
   <CompactImageUpload name="local_file" deferred={true} />
   ```
4. **With Extra Metadata**:
   ```jsx
   <CompactImageUpload name="img" extraData={{ machine_sn: 'MC-001', process: 'assy' }} />
   ```
5. **Custom Storage Folder**:
   ```jsx
   <CompactImageUpload name="part_img" uploadFolder="qc_records" uploadPath="/upload/qc" />
   ```

---

## ✂️ 2. `EDWFinalRecordCutting`
**Purpose**: A specialized dual-table layout (Record + Standard) for EDW final cutting results.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `prefix` | `string` | `""` | String prefix for all RHF field names. |
| `standards` | `Object` | `{}` | Overrides for default standards (V, A, Speed, Time). |
| `placeholders` | `Object` | `{}` | Custom placeholder text for table inputs. |
| `dataRows` | `Array` | `[...]` | Custom row configuration for the Record table. |
| `standardRows` | `Array` | `[...]` | Custom row configuration for the Standard table. |

### 🧠 Technical Logic
- **Time Validation**: Includes advanced `timeToMinutes` logic to validate "MM:SS" or "H:MM:SS" strings against numeric standards.
- **Dynamic Validation**: Uses a custom `getUIVallidationClass` that highlights cells in red if values fall outside of standard ranges.
- **Layout**: Renders a 55%/45% split between the input table and the reference standard table.

### 📝 Code Examples
1. **Standard Page 120**:
   ```jsx
   <EDWFinalRecordCutting prefix="p120_" />
   ```
2. **Override Standards**:
   ```jsx
   <EDWFinalRecordCutting standards={{ c0001: { v: '30~35' }, totalTime: 'H081= 60:00~70:00' }} />
   ```
3. **Custom Placeholders**:
   ```jsx
   <EDWFinalRecordCutting placeholders={{ c0001: { v: 'H122-NEW', a: 'H142-NEW' } }} />
   ```
4. **With Custom Children**:
   ```jsx
   <EDWFinalRecordCutting prefix="cut_">
     <div className="mt-2 text-xs">Note: Checked under high load.</div>
   </EDWFinalRecordCutting>
   ```
5. **Partial Data Rows**:
   ```jsx
   <EDWFinalRecordCutting dataRows={[{ id: "C0001", stdKey: "c0001" }, { id: "Wire broken", isFooter: true }]} />
   ```

---

## 🌊 3. `EDWFinalRoughnessCheck`
**Purpose**: A high-precision table for recording surface roughness (Ra/Rz) across multiple machine axes and generations.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `prefix` | `string` | `""` | RHF name prefix. |
| `standards` | `Object` | `{}` | Custom standard ranges or input toggles. |
| `variant` | `string` | `'3rd'` | `'3rd'`, `'4th'`, or `'4th-7points'`. Controls column count and labels. |
| `headerSuffix` | `string` | `'(4th)'` | Text appended to column headers. |
| `className` | `string` | `""` | Container styling. |

### 🧠 Technical Logic
- **Variant Logic**: Dynamically switches between 3 columns (3rd gen) and 7+ columns (4th gen) layouts.
- **Smart Standard Display**: Shows "No Need" for cells where roughness isn't typically measured for that specific axis/variant.
- **Range Parsing**: Parses strings like "0.330~0.430" to apply validation rules automatically to inputs.

### 📝 Code Examples
1. **3rd Generation**:
   ```jsx
   <EDWFinalRoughnessCheck variant="3rd" prefix="p20_" />
   ```
2. **4th Generation**:
   ```jsx
   <EDWFinalRoughnessCheck variant="4th" prefix="p21_" />
   ```
3. **7-Points Layout**:
   ```jsx
   <EDWFinalRoughnessCheck variant="4th-7points" standards={{ range: '0.1~0.2' }} />
   ```
4. **Custom Standard Row**:
   ```jsx
   <EDWFinalRoughnessCheck standards={{ stds: { a: '0.400', b: '0.400' } }} />
   ```
5. **Custom Width**:
   ```jsx
   <EDWFinalRoughnessCheck variant="4th" className="max-w-[600px] shadow-sm" />
   ```

---

## 📏 4. `EDWFinalSizeRecord`
**Purpose**: specialized table for recording dimension measurement results (Up/Mid/Low) with support for dual-standard validation.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `prefix` | `string` | `""` | RHF name prefix. |
| `standards` | `Object` | `{}` | Dictionary of standard range strings. |
| `variant` | `string` | `'3rd'` | `'3rd'`, `'4th'`, `'4th-pairs'`, or `'4th-dual-std'`. |
| `headerSuffix` | `string` | `'(4th)'` | Header text suffix. |

### 🧠 Technical Logic
- **Dual Standard**: The `4th-dual-std` variant allows comparing data against both "P" and "GQ" standard rows.
- **Range Parsing**: Can parse both `~` and `-` separators for validation.
- **Validation Styling**: Uses `bg-red-500` and white text for values out of range, separate from RHF required errors.

### 📝 Code Examples
1. **Basic 3rd Gen Size**:
   ```jsx
   <EDWFinalSizeRecord variant="3rd" standards={{ range: '7.9~8.1' }} />
   ```
2. **Pair Mode (a-e, b-f, etc.)**:
   ```jsx
   <EDWFinalSizeRecord variant="4th-pairs" />
   ```
3. **Dual Standard Mode**:
   ```jsx
   <EDWFinalSizeRecord variant="4th-dual-std" standards={{ x_p: '8.00', y_p: '8.01' }} />
   ```
4. **With Prefix**:
   ```jsx
   <EDWFinalSizeRecord prefix="sample_A_" variant="4th" />
   ```
5. **Custom Specific Axis Standards**:
   ```jsx
   <EDWFinalSizeRecord standards={{ x: '10.00~10.02', y: '15.00~15.05' }} />
   ```

---

## 🧮 5. `EquationBox`
**Purpose**: A localized math engine that monitors two input fields and automatically calculates the result (A + B, A - B, A * B, A / B).

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `nameLeft` | `string` | **Required** | RHF name for first operand. |
| `nameRight` | `string` | **Required** | RHF name for second operand. |
| `nameResult` | `string` | **Required** | RHF name for calculation result. |
| `operator` | `string` | **Required** | `'-'`, `'+'`, `'*'`, or `'÷'`. |
| `labelLeft` | `string` | `""` | UI label above first operand. |
| `labelRight` | `string` | `""` | UI label above second operand. |
| `labelResult` | `string` | `""` | UI label above result field. |
| `minStd` | `number` | `undefined` | Min standard for result validation. |
| `maxStd` | `number` | `undefined` | Max standard for result validation. |
| `stdText` | `string` | `""` | Descriptive text shown next to result (e.g., "±0.05"). |

### 🧠 Technical Logic
- **Auto-Sync**: Uses `useEffect` and `useWatch` to update the result field instantly as operands change.
- **Float Precision**: Automatically limits division and multiplication to 2 decimal places.
- **Validation**: Integrates `FormInputCheckSTD` for the result field to show out-of-range warnings.

### 📝 Code Examples
1. **Subtraction (Gap Check)**:
   ```jsx
   <EquationBox nameLeft="base" nameRight="reading" nameResult="gap" operator="-" labelResult="GAP" />
   ```
2. **Addition (Total Weight)**:
   ```jsx
   <EquationBox nameLeft="w1" nameRight="w2" nameResult="w_total" operator="+" labelResult="Total" />
   ```
3. **Multiplication (Area)**:
   ```jsx
   <EquationBox nameLeft="l" nameRight="w" nameResult="area" operator="*" labelResult="Area (m2)" />
   ```
4. **With Standards**:
   ```jsx
   <EquationBox nameLeft="a" nameRight="b" nameResult="res" operator="-" minStd={-2} maxStd={2} stdText="±2" />
   ```
5. **Division**:
   ```jsx
   <EquationBox nameLeft="sum" nameRight="count" nameResult="avg" operator="÷" labelResult="Avg" />
   ```

---

## 📊 6. `FinalConditionTable`
**Purpose**: A clean, read-only display table for final machine conditions. It uses a row-label and values array structure.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `headers` | `Array<string>` | **Required** | Array of column headers (e.g., `['X', 'Y', 'Z']`). |
| `tableRows` | `Array<Object>` | **Required** | Array of objects `{ label: string, values: Array }`. |

### 🧠 Technical Logic
- **Header Mapping**: The first column is always an empty header for the labels.
- **Row Mapping**: Iterates through `tableRows`, rendering the `label` in bold and the `values` in sequence.

### 📝 Code Examples
1. **Basic 3-Axis Condition**:
   ```jsx
   <FinalConditionTable 
     headers={['X', 'Y', 'Z']} 
     tableRows={[{ label: 'Initial', values: [0, 0, 0] }]} 
   />
   ```
2. **Multi-Row Specs**:
   ```jsx
   <FinalConditionTable 
     headers={['Min', 'Max']} 
     tableRows={[
       { label: 'Voltage', values: [220, 240] },
       { label: 'Current', values: [10, 15] }
     ]} 
   />
   ```
3. **With Status Text**:
   ```jsx
   <FinalConditionTable 
     headers={['Status']} 
     tableRows={[{ label: 'Coolant', values: ['Normal'] }]} 
   />
   ```
4. **Complex Matrix**:
   ```jsx
   <FinalConditionTable 
     headers={['L', 'R']} 
     tableRows={[
       { label: 'Front', values: [1.2, 1.2] },
       { label: 'Back', values: [1.3, 1.3] }
     ]} 
   />
   ```
5. **Single Value Check**:
   ```jsx
   <FinalConditionTable 
     headers={['Reading']} 
     tableRows={[{ label: 'Atmosphere', values: ['1013 hPa'] }]} 
   />
   ```

---

## 🛡️ 7. `FinalEDWwireCheck`
**Purpose**: A comprehensive inspection summary box for EDW wire-cut machines, including Judge, Line, XY-Size, Ra/Rz, and Barrel checks with integrated digital signature.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `prefix` | `string` | `""` | Prefix for RHF field names (e.g., `judge_ok`, `name`, `date`). |

### 🧠 Technical Logic
- **Audit Workflow**: Integrated with `AuthContext` and `SignatureModal`. Clicking the "Name" field opens a signature modal.
- **Auto-Fill**: Automatically fills the "Name" (username) and "Date" (current date) upon signature confirmation.
- **Composite State**: Manages 9+ fields (OK/NG checkboxes for multiple items) within a single compact visual box.

### 📝 Code Examples
1. **Basic Usage**:
   ```jsx
   <FinalEDWwireCheck prefix="p127_" />
   ```
2. **With Custom Prefix**:
   ```jsx
   <FinalEDWwireCheck prefix="final_audit_" />
   ```
3. **Inside a Column Layout**:
   ```jsx
   <div className="flex justify-end">
     <FinalEDWwireCheck prefix="p1_" />
   </div>
   ```
4. **Multiple Checks**:
   ```jsx
   <FinalEDWwireCheck prefix="op1_" />
   <FinalEDWwireCheck prefix="op2_" />
   ```
5. **At Bottom of Page**:
   ```jsx
   <footer>
     <FinalEDWwireCheck prefix="footer_" />
   </footer>
   ```

---

## 🍯 8. `FormCeramicCheckEDM`
**Purpose**: A RHF wrapper for the `CeramicCheckEDM` component, used to record and visualize ceramic plate inspection points on EDM machines.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `defaultValue` | `any` | `undefined` | Initial value for the component. |
| `...props` | `any` | `undefined` | All other props passed to the underlying `CeramicCheckEDM`. |

### 🧠 Technical Logic
- **Direct Control**: Connects the custom internal UI of `CeramicCheckEDM` to RHF's `control` object.
- **Visual Grid**: Typically renders a layout representing the physical ceramic plate points.

### 📝 Code Examples
1. **Default Usage**:
   ```jsx
   <FormCeramicCheckEDM name="p15_ceramic" />
   ```
2. **With Initial Data**:
   ```jsx
   <FormCeramicCheckEDM name="c1" defaultValue={{ tl: 0, tr: 1 }} />
   ```
3. **Custom Styling**:
   ```jsx
   <FormCeramicCheckEDM name="c2" className="bg-gray-50 p-4" />
   ```
4. **With Label**:
   ```jsx
   <div>
     <label>Ceramic Plate Check:</label>
     <FormCeramicCheckEDM name="plate_check" />
   </div>
   ```
5. **Inside a Table Cell**:
   ```jsx
   <td><FormCeramicCheckEDM name="table_ceramic" /></td>
   ```

---

## 📐 9. `FormCeramicCheckEDW`
**Purpose**: A RHF-controlled version of the `CeramicCheckEDW` component for wire-cut (EDW) machine ceramic plates.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `defaultValue` | `Array` | `[]` | Initial value. |
| `...props` | `any` | `undefined` | Passed to the underlying component. |

### 🧠 Technical Logic
- **Validation**: Includes a strict `rules` validation that ensures all 8 critical points (`tl`, `tc`, `tr`, `ml`, `mc`, `mr`, `bl`, `br`) are filled.
- **Controller Integration**: Uses RHF `Controller` for two-way data binding with the custom visual UI.

### 📝 Code Examples
1. **Basic Page 18**:
   ```jsx
   <FormCeramicCheckEDW name="p18_ceramic" />
   ```
2. **With Initial Array**:
   ```jsx
   <FormCeramicCheckEDW name="test" defaultValue={[]} />
   ```
3. **With Custom Error Handling**:
   ```jsx
   <FormCeramicCheckEDW name="c1" rules={{ required: "Complete all 8 points" }} />
   ```
4. **Larger Scale**:
   ```jsx
   <FormCeramicCheckEDW name="main_plate" className="transform scale-110" />
   ```
5. **Validation Integration**:
   ```jsx
   <FormCeramicCheckEDW name="q" rules={{ validate: (v) => v.length > 5 || "Too few points" }} />
   ```

---

## ✍️ 10. `FormCheckedBox`
**Purpose**: The standard digital signature box used across almost every checksheet to record "CHECKED BY" and "DATE".

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name (stores object `{ name, date }`). |
| `label` | `string` | `"CHECKED BY / DATE"` | The title text above the box. |
| `defaultValue` | `Object` | `{ name: '', date: '' }` | Default values. |
| `className` | `string` | `undefined` | CSS class for the wrapper. |
| `rules` | `Object` | *Default Required* | Custom RHF validation rules. |

### 🧠 Technical Logic
- **Compound Value**: Manages an object with two fields (`name` and `date`) within a single RHF `name`.
- **Validation**: By default, it requires both `name` and `date` to be non-empty strings.
- **UI Sync**: Bridges `onNameChange` and `onDateChange` to a single RHF `onChange` call.

### 📝 Code Examples
1. **Standard Bottom Signature**:
   ```jsx
   <FormCheckedBox name="signature" />
   ```
2. **Custom Label**:
   ```jsx
   <FormCheckedBox name="approved_by" label="APPROVED BY / DATE" />
   ```
3. **Custom Validation**:
   ```jsx
   <FormCheckedBox name="s1" rules={{ required: "Please sign off" }} />
   ```
4. **Within a Grid**:
   ```jsx
   <div className="grid grid-cols-2 gap-4">
     <FormCheckedBox name="checker1" label="CHECKER 1" />
     <FormCheckedBox name="checker2" label="CHECKER 2" />
   </div>
   ```
5. **Initial Value**:
   ```jsx
   <FormCheckedBox name="s" defaultValue={{ name: 'Admin', date: '01/01/2024' }} />
   ```

---

## 🔢 11. `FormChecknumber`
**Purpose**: A standard numeric input wrapper for RHF. It uses the `Checknumber` UI component, which typically includes numeric keypad support and inline validation.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `label` | `string` | `undefined` | Label text shown above or beside the input. |
| `defaultValue` | `string`/`number` | `""` | Initial value. |
| `required` | `boolean` | `true` | If true, RHF will enforce a non-empty value. |
| `className` | `string` | `""` | Container styling. |
| `...props` | `any` | `undefined` | Passed to the underlying `Checknumber` (e.g., `precision`, `minStd`, `maxStd`). |

### 🧠 Technical Logic
- **Keypad Integration**: Usually paired with a global keypad listener for physical/virtual numeric entry.
- **Validation Colors**: Pass `error` state (boolean) to the child to trigger red borders or backgrounds.
- **Default Behavior**: Fields are marked as required by default unless explicitly disabled, ensuring data integrity in checksheets.

### 📝 Code Examples
1. **Basic Numeric Input**:
   ```jsx
   <FormChecknumber name="dial_gauge_no" label="Dial Gauge No." />
   ```
2. **Not Required**:
   ```jsx
   <FormChecknumber name="optional_val" label="Extra" required={false} />
   ```
3. **With Precision**:
   ```jsx
   <FormChecknumber name="measurement" precision={3} defaultValue="0.000" />
   ```
4. **Standard Validation**:
   ```jsx
   <FormChecknumber name="p1" minStd={-5} maxStd={5} label="Deviation" />
   ```
5. **Styled Container**:
   ```jsx
   <FormChecknumber name="res" className="bg-yellow-50 font-bold" />
   ```

---

## 📅 12. `FormDateInput`
**Purpose**: A RHF wrapper for date selection components, ensuring date strings (usually `DD/MM/YYYY`) are captured correctly.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `label` | `string` | `undefined` | Label text. |
| `defaultValue` | `string` | `""` | Initial date string. |
| `...props` | `any` | `undefined` | Passed to the underlying `DateInput`. |

### 🧠 Technical Logic
- **Required by Default**: Like numeric inputs, dates are usually mandatory for checksheet traceability.
- **Format Sync**: Maps the complex UI state of a date picker back to a simple string in the form state.

### 📝 Code Examples
1. **Basic Check Date**:
   ```jsx
   <FormDateInput name="check_date" label="Inspection Date" />
   ```
2. **With Initial Value**:
   ```jsx
   <FormDateInput name="d1" defaultValue="16/02/2026" />
   ```
3. **Inside a Signature Area**:
   ```jsx
   <div className="flex gap-2">
     <FormChecknumber name="name" label="Name" />
     <FormDateInput name="date" label="Date" />
   </div>
   ```
4. **Custom Style**:
   ```jsx
   <FormDateInput name="d2" className="border-none text-blue-500" />
   ```
5. **Read-only Mode (via props)**:
   ```jsx
   <FormDateInput name="fixed_date" readOnly={true} />
   ```

---

## 📂 13. `FormDoubleCheckTable`
**Purpose**: A heavy-duty audit table designed for "Double Check" parts. Supports 3-step OK/NG verification, image uploads per step, and dynamic part lists.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Double Check"` | Table header title. |
| `rows` | `Array<Object>` | `[]` | Data for each row (see Row Structure below). |
| `fieldPrefix` | `string` | `"dc"` | Prefix for generated RHF names. |
| `apiEndpoint` | `string` | **Required** | API URL for direct image uploads. |

**Row Structure**:
`{ id, partName, qty, torque, image, modelLabel, subParts, note, customCheck }`

### 🧠 Technical Logic
- **Step Verification**: Each row has 3 steps. Each step has an OK checkbox, an NG checkbox (mutually exclusive), and a private image upload button.
- **Exclusivity**: Checking "OK" automatically unchecks "NG" for that specific step and row.
- **Deferred Uploads**: Uses `CompactImageUpload` in `deferred={true}` mode, storing the File object for bulk upload during final form save.
- **Dynamic Naming**: Generates names like `${prefix}_${rowId}_c${step}_ok`.

### 📝 Code Examples
1. **Basic Audit Table**:
   ```jsx
   <FormDoubleCheckTable 
     rows={[{ id: '1', partName: 'Spindle Bolt', qty: 4, torque: '350' }]}
     apiEndpoint={API_URL}
   />
   ```
2. **With Sub-parts and Notes**:
   ```jsx
   <FormDoubleCheckTable 
     rows={[{ 
       id: '2', 
       partName: 'Main Column', 
       subParts: ['Socket Bolt M12 x 45', 'Washer'],
       note: 'Check gap after tightening'
     }]}
   />
   ```
3. **With Model Labels (Variants)**:
   ```jsx
   <FormDoubleCheckTable 
     rows={[{ id: '3', partName: 'Cover', modelLabel: 'V3-Model ONLY' }]}
   />
   ```
4. **Custom NG labels**:
   ```jsx
   <FormDoubleCheckTable 
     rows={[{ id: '4', partName: 'Sensor', ngLabel: 'SHORT' }]}
   />
   ```
5. **With Micron Measurement Step**:
   ```jsx
   <FormDoubleCheckTable 
     rows={[{ 
       id: '5', 
       partName: 'Bearing', 
       customCheck: { step: 1, label: 'μm' } 
     }]}
   />
   ```

---

## 🏗️ 14. `FormEDMBodyCheckTable`
**Purpose**: specialized visual component for recording EDM (Electronic Discharge Machine) body/frame inspection points.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `defaultValue` | `any` | `undefined` | Initial values. |
| `...props` | `any` | `undefined` | Passed to the underlying `EDMBodyCheckTable`. |

### 🧠 Technical Logic
- **Visual Mapping**: Typically displays a machine diagram with clickable or input-mapped points.
- **State Capture**: Aggregates multiple inspection points into a single RHF name (usually an object or array).

### 📝 Code Examples
1. **Standard EDM Page 5**:
   ```jsx
   <FormEDMBodyCheckTable name="p5_body_check" />
   ```
2. **With Calibration Data**:
   ```jsx
   <FormEDMBodyCheckTable name="body_1" defaultValue={{ point_a: 'OK', point_b: 'NG' }} />
   ```
3. **Read-only Review**:
   ```jsx
   <FormEDMBodyCheckTable name="preview" readOnly={true} />
   ```
4. **Custom Icon Set**:
   ```jsx
   <FormEDMBodyCheckTable name="body" variant="compact" />
   ```
5. **Inside a Layout Grid**:
   ```jsx
   <div className="grid grid-cols-2">
     <FormEDMBodyCheckTable name="left_side" />
     <FormEDMBodyCheckTable name="right_side" />
   </div>
   ```

---

## 🧲 15. `FormEDMCoilMagnetCheck`
**Purpose**: dedicated component for tracking the pull-test and alignment results of magnets and coils in EDM machines.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `defaultValue` | `any` | `undefined` | Initial state. |
| `...props` | `any` | `undefined` | Props for the underlying `EDMCoilMagnetCheck`. |

### 🧠 Technical Logic
- **Status Tracking**: Manages the status of magnetic force and coil continuity checks.
- **RHF Binding**: Directly connects visual status indicators to the form state.

### 📝 Code Examples
1. **Coil Pull Test**:
   ```jsx
   <FormEDMCoilMagnetCheck name="magnet_test" />
   ```
2. **With Initial Results**:
   ```jsx
   <FormEDMCoilMagnetCheck name="c1" defaultValue={{ force: 50, status: 'pass' }} />
   ```
3. **Custom Thresholds**:
   ```jsx
   <FormEDMCoilMagnetCheck name="c2" minForce={45} />
   ```
4. **Compact Variant**:
   ```jsx
   <FormEDMCoilMagnetCheck name="c3" className="max-w-xs" />
   ```
5. **Inside an Inspection Row**:
   ```jsx
   <section>
     <h5>Rolling Measurements</h5>
     <FormEDMTableRollingX name="sub_roll" label="Value" />
   </section>
   ```

---

## 🌀 21. `FormEDMTableRollingY`
**Purpose**: A vertical measurement table for "Rolling" on the Y-Axis. Uses Left/Right arrow indicators.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name (array state). |
| `rows` | `number` | `5` | Number of measurement points. |
| `standards` | `Array<Object>` | `[]` | Reference standards for each point. |
| `showStd` | `boolean` | `true` | shows the STD column. |
| `validateStd` | `boolean` | `true` | Enables red-background validation. |

### 🧠 Technical Logic
- **Horizontal Shift Indicators**: Uses `InputWithArrow` set to `axis="x"` (Left/Right) to track rolling deviation across a vertical travel.
- **Vertical Navigation**: "Enter" key moves focus UP (to the previous row).
- **Layout**: Renders columns: [No., STD (optional), Rolling].

### 📝 Code Examples
1. **Vertical Rolling Check**:
   ```jsx
   <FormEDMTableRollingY name="p6_rol_y" rows={5} />
   ```
2. **Hidden Standards**:
   ```jsx
   <FormEDMTableRollingY name="simple" showStd={false} />
   ```
3. **Large Machine Axis**:
   ```jsx
   <FormEDMTableRollingY name="long_roll" rows={12} />
   ```
4. **Strict Audit Mode**:
   ```jsx
   <FormEDMTableRollingY name="qa" validateStd={true} standards={stds} />
   ```
5. **Read-only Mode**:
   ```jsx
   <FormEDMTableRollingY name="res" disabled={true} />
   ```

---

## 📏 22. `FormEDMTableStraightness`
**Purpose**: RHF wrapper for the `EDMTableStraightness` component, used to record linear accuracy of a machine axis.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `defaultValue` | `any` | `undefined` | Initial state. |
| `...props` | `any` | `undefined` | Passed to the underlying `EDMTableStraightness`. |

### 🧠 Technical Logic
- **Compound State**: Manages an array of measurement values and potentially a total straightness calculation.
- **Visual Table**: Renders a multi-column table for recording deviation at various points along an axis.

### 📝 Code Examples
1. **Basic Usage**:
   ```jsx
   <FormEDMTableStraightness name="p10_str" />
   ```
2. **With Custom Points**:
   ```jsx
   <FormEDMTableStraightness name="s1" points={10} />
   ```
3. **With Precision Props**:
   ```jsx
   <FormEDMTableStraightness name="s2" decimalPlaces={4} />
   ```
4. **Calculated Standard**:
   ```jsx
   <FormEDMTableStraightness name="s3" maxStraightness={0.005} />
   ```
5. **Inside a Summary Box**:
   ```jsx
   <div className="border p-2">
     <h6>X-Axis Straightness</h6>
     <FormEDMTableStraightness name="x_str" />
   </div>
   ```

---

## 📐 23. `FormEDMYawingX`
**Purpose**: specialized component for recording and calculating "Yawing" (rotation around Z-axis) on the X-Axis.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name (stores complex object). |
| `defaultValue` | `Object` | `{}` | Initial state. |
| `...props` | `any` | `undefined` | Props for the underlying `EDMYawingX`. |

### 🧠 Technical Logic
- **Strict Validation**: Requires `squareNo`, `dialGaugeNo`, and calculation results (`xMinus`, `xC`, `xPlus`) to be non-empty.
- **Complex State**: Manages fields for Equipment IDs, Raw readings, and Final calculated values within one form object.
- **Coordinate Conversion**: Integrates logic to map 3-point readings into a yawing curve.

### 📝 Code Examples
1. **Top Inspection**:
   ```jsx
   <FormEDMYawingX name="p8_yaw_x" />
   ```
2. **Initial Equipment IDs**:
   ```jsx
   <FormEDMYawingX name="y1" defaultValue={{ squareNo: 'SQ-01', dialGaugeNo: 'DG-11' }} />
   ```
3. **With Custom Labels**:
   ```jsx
   <FormEDMYawingX name="y2" label="X-Axis Yawing Profile" />
   ```
4. **Calculated Standard**:
   ```jsx
   <FormEDMYawingX name="y3" std={0.005} />
   ```
5. **Compact Mode**:
   ```jsx
   <FormEDMYawingX name="y4" variant="compact" />
   ```

---

## 📐 24. `FormEDMYawingY`
**Purpose**: specialized component for recording and calculating "Yawing" on the Y-Axis.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name (object state). |
| `defaultValue` | `Object` | `{}` | Initial state. |
| `...props` | `any` | `undefined` | Props for the underlying `EDMYawingY`. |

### 🧠 Technical Logic
- **Y-Specific Logic**: Validates a different set of points (`yPlus`, `yC`, `yMinus`) compared to the X version.
- **RHF binding**: Uses a custom `onChange` handler to bridge individual component input updates into a single form object update.

### 📝 Code Examples
1. **Page 8 Inspection**:
   ```jsx
   <FormEDMYawingY name="p8_yaw_y" />
   ```
2. **Default Tooling data**:
   ```jsx
   <FormEDMYawingY name="y1" defaultValue={{ squareNo: 'SQ-02' }} />
   ```
3. **Within specialized Row**:
   ```jsx
   <tr>
     <td>Y-Axis Check</td>
     <td><FormEDMYawingY name="table_yaw" /></td>
   </tr>
   ```
4. **With Validation Class**:
   ```jsx
   <FormEDMYawingY name="q1" className="p-2 bg-blue-50" />
   ```
5. **High Precision Mode**:
   ```jsx
   <FormEDMYawingY name="hp" precision={4} />
   ```

---

## ↕️ 25. `FormEDMparallelX`
**Purpose**: A measurement table for checking Parallelism on the X-Axis, typically comparing two points (A vs B) across several rows.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name (array of `{a, b}` objects). |
| `rows` | `number` | `5` | Number of check rows. |
| `standards` | `Array` | `[]` | Tolerance array for each row. |
| `showStd` | `boolean` | `false` | Shows a standard reference header/row. |
| `validateStd` | `boolean` | `false` | Real-time OK/NG highlighting. |

### 🧠 Technical Logic
- **Pair Validation**: The custom validation rule ensures that BOTH points (A and B) are filled for every row before the field is considered valid.
- **Data Shape**: Transforms UI interactions into an array of objects: `[{a: '0.005', b: '0.004'}, ...]`.
- **Default State**: Automatically generates an empty array of the correct length if no initial data is provided.

### 📝 Code Examples
1. **Basic 5-Row Parallelism**:
   ```jsx
   <FormEDMparallelX name="p7_para_x" rows={5} />
   ```
2. **With Tolerances**:
   ```jsx
   <FormEDMparallelX name="p1" showStd={true} standards={[0.002, 0.002]} />
   ```
3. **Strict Inspection**:
   ```jsx
   <FormEDMparallelX name="audit" validateStd={true} rows={10} />
   ```
4. **Inside a Column Split**:
   ```jsx
   <div className="grid grid-cols-2">
     <FormEDMparallelX name="left_p" label="Left" />
     <FormEDMparallelX name="right_p" label="Right" />
   </div>
   ```
5. **Initial Values**:
   ```jsx
   <FormInputCheckSTD name="opt" label="Optional" required={false} />
   ```

---

## ✅ 31. `FormItemCheck`
**Purpose**: A highly versatile layout component for inspection items. Supports basic (Label + Input) and advanced (Array of mixed items) modes with integrated `TristateCheckbox`.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name for the main checkbox. |
| `label` | `string` | `undefined` | Simple text label (Basic Mode). |
| `input` | `object` | `undefined` | Config for an optional input field next to the label. |
| `items` | `Array<Object>`| `undefined` | Array of `{label, input}` objects (Advanced Mode). |
| `showCheckbox` | `boolean` | `true` | shows the Pass/Fail/Wait checkbox. |
| `onCheckedChange` | `function` | `undefined` | Callback when checkbox state changes. |

### 🧠 Technical Logic
- **Advanced Mode**: If `items` is provided, it iterates through them to render a mix of labels and inputs in one line.
- **Validation**: Inputs within `FormItemCheck` support `minStd`, `maxStd`, and `expectedValue` validation with automatic color highlighting.
- **Shortcuts**: Supports "Infinity" (8) shortcut in text inputs via `handleInfinityShortcut`.

### 📝 Code Examples
1. **Basic Checkbox + Label**:
   ```jsx
   <FormItemCheck name="item_1" label="Check machine cleanliness" />
   ```
2. **Label + Measurement Input**:
   ```jsx
   <FormItemCheck 
     name="item_2" 
     label="Main Pressure" 
     input={{ name: 'press_val', minStd: 0.4, maxStd: 0.6, suffix: 'MPa' }} 
   />
   ```
3. **Advanced Mixed Row**:
   ```jsx
   <FormItemCheck 
     name="item_3" 
     items={[
       { label: 'Temp:' },
       { input: { name: 't1', width: '60px' } },
       { label: '°C | Humid:' },
       { input: { name: 'h1', width: '60px' } }
     ]} 
   />
   ```
4. **Expected Value Validation**:
   ```jsx
   <FormItemCheck 
     name="item_4" 
     label="Software Version" 
     input={{ name: 'sw_ver', expectedValue: 'V2.1' }} 
   />
   ```
5. **No Checkbox (Label Only)**:
   ```jsx
   <FormItemCheck showCheckbox={false} label="Section Header" labelClassName="font-bold underline" />
   ```

---

## 🧭 32. `FormLevelTableWithDirections`
**Purpose**: specialized table for Pitching and Rolling checks. Automatically calculates the absolute difference between two points (A and B).

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF base name. |
| `direction` | `string` | `'pitching'` | `'pitching'` (Y-axis arrows) or `'rolling'` (X-axis arrows). |
| `rows` | `number` | `5` | Number of measurement points. |
| `labelA`/`labelB` | `string` | `"A"`/`"B"` | Column headers. |
| `labelStd` | `string` | `"STD Diff"` | Header for the calculation column. |

### 🧠 Technical Logic
- **Reference Point**: Row index 2 (usually the center point) is treated as a reference; its difference is always 0.
- **Auto-Diff**: The "STD Diff" column uses `useWatch` to dynamically calculate `|A - B|`.
- **Navigation**: "Enter" key movesfocus vertically within column 'a' first, then switches to 'b'.

### 📝 Code Examples
1. **Pitching Y Check**:
   ```jsx
   <FormLevelTableWithDirections name="pit_y" direction="pitching" />
   ```
2. **Rolling X Check**:
   ```jsx
   <FormLevelTableWithDirections name="rol_x" direction="rolling" />
   ```
3. **Custom Headers**:
   ```jsx
   <FormLevelTableWithDirections name="l1" labelA="FRONT" labelB="REAR" />
   ```
4. **Large 10-point Scale**:
   ```jsx
   <FormLevelTableWithDirections name="long_l" rows={10} />
   ```
5. **Inlined in Grid**:
   ```jsx
   <div className="flex gap-4">
     <FormLevelTableWithDirections name="side_a" direction="rolling" labelA="Side A" />
     <FormLevelTableWithDirections name="side_b" direction="rolling" labelA="Side B" />
   </div>
   ```

---

## ↔️ 33. `FormLevelTableXAB`
**Purpose**: A horizontal measurement table for X-axis leveling (Left/Right travel). Typically used for B and A=Kb comparisons.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF base name. |
| `cols` | `number` | `9` | Number of measurement columns. |
| `standards` | `Array` | `[]` | Standards array for validation and display. |
| `showStd` | `boolean` | `false` | shows reference standard row. |
| `validateStd` | `boolean` | `false` | Enables red-background validation. |

### 🧠 Technical Logic
- **Horizontal Navigation**: "Enter" moves the focus to the Right. At the end of row 'b', it wraps to the start of row 'a'.
- **Standard Formatting**: Renders arrows (→ for +, ← for -) in the standard reference text.
- **Axis Arrows**: uses `InputWithArrow` set to `axis="x"` (Left/Right indicator).

### 📝 Code Examples
1. **Standard Level X**:
   ```jsx
   <FormLevelTableXAB name="p3_lev_x" cols={9} />
   ```
2. **With Tolerance Row**:
   ```jsx
   <FormLevelTableXAB name="l1" showStd={true} standards={stdsArray} validateStd={true} />
   ```
3. **Custom Row Labels**:
   ```jsx
   <FormLevelTableXAB name="l2" labelA="UP" labelB="LOW" />
   ```
4. **Short Axis (5 points)**:
   ```jsx
   <FormLevelTableXAB name="l3" cols={5} />
   ```
5. **Without Arrow UI**:
   ```jsx
   <FormLevelTableXAB name="no_arr" showArrows={false} />
   ```

---

## 📊 34. `FormLevelTableXStdAct`
**Purpose**: specialized complex table for X-axis leveling with grouped "SD" (Standard) and "ACT" (Actual) rows, as seen on Page 3.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF base name. |
| `groups` | `Array<Object>`| `[]` | Config: `[{ label: 'A', sd: [...], tolerance: 4 }]`. |
| `cols` | `number` | `13` | Number of columns. |

### 🧠 Technical Logic
- **Tolerance Validation**: Automatically checks if `ACT` value is within `SD +/- tolerance`. Supports parsing SD strings with arrows (e.g. `←20` becomes `-20`).
- **Grouped Layout**: Group Label | SD Row (Read-only) | ACT Row (Inputs).
- **Navigation**: Enter and Arrow keys allow full 2D navigation (Up/Down/Left/Right) between ACT cells across groups, skipping the read-only SD rows.

### 📝 Code Examples
1. **Page 3 Item 6 Config**:
   ```jsx
   <FormLevelTableXStdAct 
     name="p3_item6" 
     groups={[{ label: 'A', sd: ['0', '←20', '←40'], tolerance: 4 }]} 
   />
   ```
2. **Multiple Groups**:
   ```jsx
   <FormLevelTableXStdAct 
     name="lev_groups" 
     groups={[
       { label: 'A', sd: [...] },
       { label: 'B', sd: [...] }
     ]} 
   />
   ```
3. **No Arrows in Inputs**:
   ```jsx
   <FormLevelTableXStdAct name="flat" showArrows={false} groups={myGroups} />
   ```
4. **Custom point count (20)**:
   ```jsx
   <FormLevelTableXStdAct name="wide" cols={20} groups={largeGroups} />
   ```
5. **Inside a Shadow Card**:
   ```jsx
   <div className="card-shadow p-6">
     <h4>Final Leveling Profile</h4>
     <FormLevelTableXStdAct name="final" groups={finalGroups} />
   </div>
   ```

---

## ↕️ 35. `FormLevelTableYAB`
**Purpose**: specialized vertical measurement table for Y-axis leveling. Supports up to 3 data columns (A, B, C) with custom navigation logic.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF base name. |
| `rows` | `number` | `16` | Number of vertical rows. |
| `showB`/`showC` | `boolean` | `true`/`false` | Toggles visibility of columns B and C. |
| `showStd` | `boolean` | `false` | shows reference standard column. |
| `standards` | `Array` | `[]` | Tolerance array for validation. |
| `axis` | `string` | `"y"` | Arrow orientation (`'y'` for Up/Down, `'x'` for Left/Right). |

### 🧠 Technical Logic
- **SOP Navigation**: Enter key behavior:
  - Column A: moves focus UP (towards Row 0). At Top of A, jumps to Top of B.
  - Column B/C: moves focus DOWN.
- **Standard Formatting**: Maps `min`, `max`, and `arrow` (+ for ↑, - for ↓) to the STD column.
- **Strict Validation**: uses `validateValue` with `useAbs: true` for out-of-spec highlighting.

### 📝 Code Examples
1. **Standard 16-Row Vertical Check**:
   ```jsx
   <FormLevelTableYAB name="p3_lev_y" rows={16} />
   ```
2. **Single Column (A only)**:
   ```jsx
   <FormLevelTableYAB name="simple_y" showB={false} />
   ```
3. **3-Column Profile (A, B, C)**:
   ```jsx
   <FormLevelTableYAB name="triple" showB={true} showC={true} />
   ```
4. **With Tolerance Column**:
   ```jsx
   <FormLevelTableYAB name="audit" showStd={true} standards={stdsArray} />
   ```
5. **Inverted Axis (X-arrows on Vertical Y)**:
   ```jsx
   <FormStartFinishTime name="t2" defaultValue={{ startTime: '08:00', finishTime: '' }} />
   ```

---

## 🏗️ 41. `FormStoneTableGrid`
**Purpose**: specialized component for recording surface plate (Stone Table) flatness. It typicaly renders a grid of points and calculates Min/Max/Diff automatically.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF base name for the grid data. |
| `maxName` | `string` | `undefined` | RHF field name to store the Maximum value. |
| `minName` | `string` | `undefined` | RHF field name to store the Minimum value. |
| `difName` | `string` | `undefined` | RHF field name for the Difference (Flatness). |
| `dialGaugeNoName`| `string` | `undefined` | RHF field for the equipment Serial No. |

### 🧠 Technical Logic
- **Grid State**: Stores an array or matrix representing point readings across the stone surface.
- **Auto-Aggregates**: Automatically computes `Max`, `Min`, and `Max-Min` (Flatness) as values are entered into the grid.
- **RHF Binding**: Maps multiple output metrics to individual form fields for easy database storage.

### 📝 Code Examples
1. **Standard Flatness Audit**:
   ```jsx
   <FormStoneTableGrid 
     name="stone_data" 
     maxName="st_max" 
     minName="st_min" 
     difName="st_flatness" 
   />
   ```
2. **With Equipment Control**:
   ```jsx
   <FormStoneTableGrid 
     name="p9_flat" 
     dialGaugeNoName="dg_serial" 
   />
   ```
3. **Custom Grid Config**:
   ```jsx
   <FormStoneTableGrid name="g1" rows={5} cols={5} />
   ```
4. **Read-only Summary**:
   ```jsx
   <FormStoneTableGrid name="view" disabled={true} />
   ```
5. **Inside a Full-Page Table**:
   ```jsx
   <div className="border border-double p-4">
     <caption>Surface Plate Check</caption>
     <FormStoneTableGrid name="main_grid" difName="res" />
   </div>
   ```

---

## 📏 42. `FormTableEnto`
**Purpose**: RHF wrapper for the `TableEnto` component, used to record mechanical "End Play" or "Backlash" measurements.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `defaultValue` | `any` | `undefined` | Initial state. |
| `...props` | `any` | `undefined` | Passed to the underlying `TableEnto`. |

### 🧠 Technical Logic
- **Simple State**: Usually manages a vertical or horizontal list of measurements for a single axis or part.
- **UI Logic**: Renders as a compact table with standard validation markers.

### 📝 Code Examples
1. **Basic End-Play Check**:
   ```jsx
   <FormTableEnto name="p5_ento" />
   ```
2. **With Precision Control**:
   ```jsx
   <FormTableEnto name="e1" decimalPlaces={4} />
   ```
3. **Axis-Specific**:
   ```jsx
   <FormTableEnto name="x_ento" label="X-Axis Endplay" />
   ```
4. **With Header Component**:
   ```jsx
   <FormTableEnto name="e2" header="Spindle Backlash" />
   ```
5. **Initial Reference Value**:
   ```jsx
   <FormTableEnto name="e3" defaultValue={['0', '0.002', '0.001']} />
   ```

---

## ↕️ 43. `FormTableEntoDual`
**Purpose**: A variation of the End Play table designed to compare two related measurements (e.g., Forward vs Reverse or Two separate bearings) side-by-side.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `defaultValue` | `any` | `undefined` | Initial state. |
| `...props` | `any` | `undefined` | Passed to the underlying `TableEntoDual`. |

### 🧠 Technical Logic
- **Dual Tracking**: Manages two columns of data points within the same component name, preserving the relationship between them.
- **RHF binding**: Corrects complex data shapes for dual-measurement SOPs.

### 📝 Code Examples
1. **Forward/Reverse Check**:
   ```jsx
   <FormTableEntoDual name="p6_dual_ento" />
   ```
2. **Left/Right Bearing Compare**:
   ```jsx
   <FormTableEntoDual name="brg_check" labelA="Left" labelB="Right" />
   ```
3. **With Shared Standards**:
   ```jsx
   <FormTableEntoDual name="d1" maxStd={0.005} validateStd={true} />
   ```
4. **Large Font Mode**:
   ```jsx
   <FormTableEntoDual name="d2" className="text-lg font-mono" />
   ```
5. **Export Style**:
   ```jsx
   <div className="bg-white p-2">
     <FormTableEntoDual name="v1" variant="outline" />
   </div>
   ```

---

## 📉 44. `FormTablePitchCheck`
**Purpose**: A high-integrity validation wrapper for pitch check tables, ensuring exhaustive data entry for multiple axes.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF base name (stores `{ a: [], b: [] }`). |
| `rowCount` | `number` | `16` | Expected number of measurement points per column. |
| `defaultValue` | `Object` | `{}` | Initial data. |

### 🧠 Technical Logic
- **Strict Validation**: The custom rule ensures that every single row (from 0 to `rowCount-1`) in both Column A and Column B has a non-empty value.
- **Failure Feedback**: Returns `"Required"` or `false` if the dataset is incomplete, preventing form submission.
- **State Structure**: Expects an object containing two arrays for the twin measurement columns.

### 📝 Code Examples
1. **Full 16-point Pitch Audit**:
   ```jsx
   <FormTablePitchCheck name="p14_pitch" rowCount={16} />
   ```
2. **Short 10-point Scale**:
   ```jsx
   <FormTablePitchCheck name="pitch_short" rowCount={10} />
   ```
3. **With Custom Rule Labels**:
   ```jsx
   <FormTablePitchCheck name="q1" label="Final Step Check" />
   ```
4. **Pre-filled Sequence**:
   ```jsx
   <FormTablePitchCheck 
     name="s1" 
     defaultValue={{ a: ['0.001', '0.002'], b: ['-0.001', '-0.001'] }} 
   />
   ```
5. **Within Validation Section**:
   ```jsx
   <div className="border border-red-500 p-2">
     <FormTablePitchCheck name="critical_p" />
   </div>
   ```

---

## 🏹 45. `FormTablePitchXYZUV`
**Purpose**: specialized component for recording pitch error across all five possible machine axes (X, Y, Z, U, V).

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `defaultValue` | `any` | `undefined` | Initial state. |
| `...props` | `any` | `undefined` | Passed to the underlying `TablePitchXYZUV`. |

### 🧠 Technical Logic
- **Multi-Axis Layout**: Renders rows or columns specifically labeled for X, Y, Z, U, and V.
- **Centralized Data**: Collects all 5 axis readings into a single structured object in the form state.

### 📝 Code Examples
1. **Total Machine Pitch Check**:
   ```jsx
   <FormTablePitchXYZUV name="p14_xyzuv" />
   ```
2. **With Axis Filter**:
   ```jsx
   <FormTablePitchXYZUV name="t1" axes={['X', 'Y', 'Z']} />
   ```
3. **With Standard Reference**:
   ```jsx
   <FormTablePitchXYZUV name="t2" std={0.005} />
   ```
4. **Compact View**:
   ```jsx
   <FormTablePitchXYZUV name="t3" className="w-[400px]" />
   ```
5. **Initial Offset Values**:
   ```jsx
   <FormTablePitchXYZUV name="t4" defaultValue={{ x: 0, y: 0.002 }} />
   ```

---

## 🏗️ 46. `FormTablePitchXYZUVBigmodel`
**Purpose**: A high-capacity pitch check table specialized for larger machines with expanded measurement ranges across 5 axes.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF base name. |
| `defaultValue` | `any` | `undefined` | Initial state. |
| `...props` | `any` | `undefined` | Passed to `TablePitchXYZUVBigmodel`. |

### 🧠 Technical Logic
- **Scaling**: Optimized for "Bigmodel" checksheet pages where standard tables lack sufficient rows or scale.
- **Unified State**: Collects cross-axis deviations into a hierarchical object structure.

### 📝 Code Examples
1. **Large Scale Pitch Check**:
   ```jsx
   <FormTablePitchXYZUVBigmodel name="big_pitch" />
   ```
2. **Preset Reference Data**:
   ```jsx
   <FormTablePitchXYZUVBigmodel name="b1" defaultValue={{ x: [0, 0.001] }} />
   ```
3. **With Custom Suffix**:
   ```jsx
   <FormTablePitchXYZUVBigmodel name="b2" suffix="um" />
   ```
4. **Validation Mode**:
   ```jsx
   <FormTablePitchXYZUVBigmodel name="b3" validateStd={true} />
   ```
5. **Standalone View**:
   ```jsx
   <div className="p-4 border shadow-sm">
     <FormTablePitchXYZUVBigmodel name="summary_pitch" />
   </div>
   ```

---

## ↕️ 47. `FormTablePitchingX` / ## ↕️ 48. `FormTablePitchingY`
**Purpose**: specialized vertical measurement tables for Pitching errors on the X and Y axes respectively.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF base name. |
| `...props` | `any` | `undefined` | Passed to the underlying `TablePitchingX/Y`. |

### 🧠 Technical Logic
- **Axis Specificity**: Renders layouts tuned for horizontal (X) vs vertical (Y) travel directions.
- **RHF Wrapper**: Ensures data is compatible with the standard checksheet JSON schema.

### 📝 Code Examples
1. **Axis X Pitching**:
   ```jsx
   <FormTablePitchingX name="px_check" />
   ```
2. **Axis Y Pitching**:
   ```jsx
   <FormTablePitchingY name="py_check" />
   ```
3. **Custom Step size**:
   ```jsx
   <FormTablePitchingX name="px1" step={50} />
   ```
4. **Pre-filled Start point**:
   ```jsx
   <FormTablePitchingY name="py1" defaultValue={[{ pos: 0, val: 0 }]} />
   ```
5. **Multi-Axis Layout**:
   ```jsx
   <div className="grid grid-cols-2">
     <FormTablePitchingX name="x1" />
     <FormTablePitchingY name="y1" />
   </div>
   ```

---

## ↔️ 49. `FormTableRollingX` / ## ↔️ 50. `FormTableRollingY`
**Purpose**: specialized tables for recording Rolling (rotation) errors during axis travel.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF base name. |
| `...props` | `any` | `undefined` | Passed to the underlying `TableRollingX/Y`. |

### 🧠 Technical Logic
- **Dynamic Headers**: Often includes visual indicators for travel direction.
- **Navigation**: utilizes the standard Enter/Arrow logic via the underlying page component.

### 📝 Code Examples
1. **X-Axis Rolling**:
   ```jsx
   <FormTableRollingX name="rx_table" />
   ```
2. **Y-Axis Rolling**:
   ```jsx
   <FormTableRollingY name="ry_table" />
   ```
3. **With Tolerance Limit**:
   ```jsx
   <FormTableRollingX name="rx1" limit={0.01} />
   ```
4. **Custom point Label**:
   ```jsx
   <FormTableRollingY name="ry1" label="Position (mm)" />
   ```
5. **Styled Context**:
   ```jsx
   <section className="mt-8">
     <h3>Rolling Error Profile</h3>
     <FormTableRollingX name="rolling_data" />
   </section>
   ```

---

## ⚡ 36. `FormQuickTable`
**Purpose**: The foundational engine for most measurement tables in the template. It provides dynamic columns, complex header rendering, row grouping, and unified keyboard navigation.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `columns` | `Array` | `[]` | Array of column definitions: `{ key, header, width, type, render, rowGroup }`. |
| `data` | `Array` | `[]` | Row data objects. |
| `headerRows` | `Array` | `null` | Multi-level header config (optional). |
| `navigationMode`| `string` | `'vertical'` | `'vertical'` (Enter = Up/Down) or `'horizontal'` (Enter = Left/Right). |

### 🧠 Technical Logic
- **Column Types**: Supports `label`, `input`, `checkbox`, and `tristate`. Input types auto-register with RHF and the navigation hook.
- **Row Spanning**: If a column has `rowGroup: true`, duplicate vertical values automatically merge into a single `rowSpan` cell.
- **Auto-Validation**: if an input's key matches a row property like `_min` or `_max`, it automatically applies conditional CSS (`getValidationClass`).
- **Keypad Sync**: Synchronizes with the global `KeypadContext` to provide virtual numeric entry on mobile/touch devices.

### 📝 Code Examples
1. **Simple 2-Column Data Table**:
   ```jsx
   <FormQuickTable 
     columns={[{ key: 'id', header: 'No.' }, { key: 'val', header: 'Value', type: 'input' }]}
     data={[{ id: 1, val: 'row1_field' }, { id: 2, val: 'row2_field' }]}
   />
   ```
2. **With Complex Headers**:
   ```jsx
   <FormQuickTable 
     headerRows={[[{ header: 'Machine Info', colSpan: 2 }], [{ header: 'Type' }, { header: 'Serial' }]]}
     columns={[{ key: 't' }, { key: 's' }]}
     data={data}
   />
   ```
3. **Grouped Category Table**:
   ```jsx
   <FormQuickTable 
     columns={[{ key: 'cat', header: 'Category', rowGroup: true }, { key: 'item', header: 'Item' }]}
     data={[{ cat: 'A', item: '1' }, { cat: 'A', item: '2' }, { cat: 'B', item: '3' }]}
   />
   ```
4. **Validated Measurement Grid**:
   ```jsx
   <FormQuickTable 
     columns={[{ key: 'std', header: 'STD' }, { key: 'act', header: 'ACT', type: 'input' }]}
     data={[{ std: '10.5', act: 'f1', act_min: 10.4, act_max: 10.6 }]}
   />
   ```
5. **Horizontal Navigation Mode**:
   ```jsx
   <FormQuickTable 
     navigationMode="horizontal"
     columns={cols}
     data={rows}
   />
   ```

---

## 📈 37. `FormSQRgrapX`
**Purpose**: A specialized wrapper for the X-axis squareness (SQR) graph, typically used to visualize deviation profile.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name. |
| `defaultValue` | `Array` | `[]` | Initial points. |
| `...props` | `any` | `undefined` | Passed to the underlying graph. |

### 🧠 Technical Logic
- **Strict Requirement**: Validates that the field is non-empty (`rules={{ required: true }}`).
- **Data Shape**: Expects an array or object containing coordinate points for the plot.

### 📝 Code Examples
1. **Standard Page 8 Graph**:
   ```jsx
   <FormSQRgrapX name="p8_graph_x" />
   ```
2. **Preset Data**:
   ```jsx
   <FormSQRgrapX name="g1" defaultValue={[1.2, 0.5, -0.4]} />
   ```
3. **Custom Height**:
   ```jsx
   <FormSQRgrapX name="g2" height={300} />
   ```
4. **Read-only Presentation**:
   ```jsx
   <FormSQRgrapX name="view" interactive={false} />
   ```
5. **Inside a Modal**:
   ```jsx
   <dialog>
     <FormSQRgrapX name="modal_g" />
   </dialog>
   ```

---

## 📐 38. `FormSquareCheckGraph`
**Purpose**: A comprehensive component for squareness checking, combining textual metadata (Serial Nos) and visual graph state.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name. |
| `defaultValue` | `Object` | `{ resultY: '', squareSideX: '', ... }` | Initial state. |

### 🧠 Technical Logic
- **State Merging**: The internal `onChange` handler merges partial key-value updates into the main RHF object state.
- **Fields Captured**: `resultY`, `squareSideX`, `squareSideY`, `squareNo`.

### 📝 Code Examples
1. **Page 8 Inspection Area**:
   ```jsx
   <FormSquareCheckGraph name="p8_sq_check" />
   ```
2. **Pre-filled Equipment**:
   ```jsx
   <FormSquareCheckGraph name="s1" defaultValue={{ squareNo: 'SQ-99' }} />
   ```
3. **Within Column Layout**:
   ```jsx
   <div className="flex gap-2">
     <FormSquareCheckGraph name="sq_left" />
     <FormSquareCheckGraph name="sq_right" />
   </div>
   ```
4. **With Custom Rule Labels**:
   ```jsx
   <FormSquareCheckGraph name="q1" label="Final Squareness" />
   ```
5. **Compact Scaling**:
   ```jsx
   <FormSquareCheckGraph name="s2" className="transform scale-75 origin-top" />
   ```

---

## 📊 39. `FormSquareCheckSQRGraph`
**Purpose**: A specialized variation of the squareness check focused on 3-point profiles (Top/Mid/Bottom).

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name. |
| `defaultValue` | `Object` | `{ resultY: '', points: { ... } }` | Initial state. |

### 🧠 Technical Logic
- **Point Tracking**: Specifically manages a nested `points` object containing `top`, `mid1`, and `mid2` values.
- **Atomic Updates**: Like the other graph wrappers, it maintains a single reference object in RHF.

### 📝 Code Examples
1. **Item 10.3 Inspection**:
   ```jsx
   <FormSquareCheckSQRGraph name="p8_10_3" />
   ```
2. **With Zero Defaults**:
   ```jsx
   <FormSquareCheckSQRGraph 
     name="z1" 
     defaultValue={{ points: { top: 0, mid1: 0, mid2: 0 } }} 
   />
   ```
3. **In Review Mode**:
   ```jsx
   <FormSquareCheckSQRGraph name="rev" readOnly={true} />
   ```
4. **Calculated Result Header**:
   ```jsx
   <FormSquareCheckSQRGraph name="res" showSummaryHeader={true} />
   ```
5. **Styled Container**:
   ```jsx
   <div className="bg-slate-50 border p-2">
     <FormSquareCheckSQRGraph name="styled_sq" />
   </div>
   ```

---

## 🕒 40. `FormStartFinishTime`
**Purpose**: RHF wrapper for capturing a task's duration. It calculates and displays the time elapsed between "Start" and "Finish".

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name (stores startTime and finishTime). |
| `minHours` | `number` | `undefined` | Minimum duration required (for validation). |
| `validateStd` | `boolean` | `false` | Enables duration-based validation. |
| `defaultValue` | `Object` | `{ startTime: '', finishTime: '' }` | Initial state. |

### 🧠 Technical Logic
- **Pair Validation**: Standard RHF rule ensures both Start and Finish times are provided.
- **Duration Hook**: Interally uses `timeToMinutes` utilities (via `StartFinishTime`) to compute the gap.
- **Validation Classes**: Highlights the duration in red if it falls below `minHours`.

### 📝 Code Examples
1. **Basic Task Timer**:
   ```jsx
   <FormStartFinishTime name="machining_time" />
   ```
2. **With 2-Hour Minimum**:
   ```jsx
   <FormStartFinishTime name="heat_treatment" minHours={2} validateStd={true} />
   ```
3. **Inside Signature Area**:
   ```jsx
   <div className="flex justify-between border p-2">
     <span>Time Used:</span>
     <FormStartFinishTime name="time_log" />
   </div>
   ```
4. **Custom Display Label**:
   ```jsx
   <FormStartFinishTime name="t1" label="Working hours" />
   ```
5. **Pre-filled Start Time**:
   ```jsx
   <FormStartFinishTime name="t2" defaultValue={{ startTime: '08:00', finishTime: '' }} />
   ```

---

## ↕️ 26. `FormEDMparallelY`
**Purpose**: A vertical measurement table for Parallelism on the Y-Axis. It includes two data columns (A=KB and B) and an auto-calculated "A+B" column.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name (array of `{a, b}` objects). |
| `rows` | `number` | `9` | Number of check rows. |
| `standards` | `Array` | `[]` | Tolerance array for each row. |
| `showStd` | `boolean` | `false` | Shows a standard reference header/row. |
| `validateStd` | `boolean` | `true` | Real-time OK/NG highlighting for inputs and sum. |

### 🧠 Technical Logic
- **Vertical Navigation**: "Enter" key moves the focus UP. If focus is at the top of column 'a', it jumps to the bottom of column 'b'.
- **Auto-Sum**: The "A+B" column uses `useWatch` to instantly sum the values of A and B as they are typed.
- **Sum Validation**: Automatically highlights the "A+B" cell in red if the absolute sum exceeds the absolute value of the standard's max.
- **Complex Header**: Uses `headerRows` to create a multi-level header with labels and "DATA" sub-labels.

### 📝 Code Examples
1. **Standard 9-Row Check**:
   ```jsx
   <FormEDMparallelY name="p7_para_y" />
   ```
2. **With Tolerance Reference**:
   ```jsx
   <FormEDMparallelY name="p1" showStd={true} standards={stdsArray} />
   ```
3. **Custom Row Count**:
   ```jsx
   <FormEDMparallelY name="q1" rows={5} />
   ```
4. **Calculated Sum View**:
   ```jsx
   <div className="shadow p-4">
     <h3>Parallelism Result</h3>
     <FormEDMparallelY name="main_para" />
   </div>
   ```
5. **Initial Alignment Data**:
   ```jsx
   <FormEDMparallelY name="s1" defaultValue={[{a: '0.001', b: '0.002'}]} />
   ```

---

## 📂 27. `FormEDWVersionCheck`
**Purpose**: A fixed 2-column layout designed specifically for checking various software and hardware versions (GUI, PLC, HI, etc.) on EDW machines.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `prefix` | `string` | `"version_"` | Prefix for the 8 version fields. |

### 🧠 Technical Logic
- **Fixed Taxonomy**: Automatically registers 8 specific fields: `gui`, `hi`, `m4h`, `uwl`, `plc`, `smart`, `disk`, and `checkedBy`.
- **Layout**: Uses a grid-cols-2 layout with 4 fields on the left and 4 on the right.
- **Validation**: All 8 fields are marked as `required: true` by default.

### 📝 Code Examples
1. **Basic System Audit**:
   ```jsx
   <FormEDWVersionCheck />
   ```
2. **With Page Prefix**:
   ```jsx
   <FormEDWVersionCheck prefix="p120_ver_" />
   ```
3. **At Bottom of Page**:
   ```jsx
   <footer className="mt-8 border-t pt-4">
     <FormEDWVersionCheck prefix="final_" />
   </footer>
   ```
4. **Multiple Machine Setup**:
   ```jsx
   <div className="space-y-4">
     <FormEDWVersionCheck prefix="sys1_" />
     <FormEDWVersionCheck prefix="sys2_" />
   </div>
   ```
5. **Inside a Bordered Section**:
   ```jsx
   <div className="border border-black p-2">
     <h4 className="text-xs font-bold underline mb-1">VERSION INFO</h4>
     <FormEDWVersionCheck prefix="v_" />
   </div>
   ```

---

## 📐 28. `FormEDWYawingX`
**Purpose**: specialization of the Yawing X component tailored for EDW (Wire-cut) machines.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name. |
| `defaultValue` | `Object` | `{}` | Initial state. |
| `...props` | `any` | `undefined` | Passed to the underlying `EDWYawingX`. |

### 🧠 Technical Logic
- **Simplified RHF Wrapper**: Unlike the EDM version, this doesn't include internal validation rules in the wrapper, relying instead on the specialized UI component it wraps.
- **State Capture**: Stores point data and equipment IDs in a single object.

### 📝 Code Examples
1. **EDW Axis Check**:
   ```jsx
   <FormEDWYawingX name="p22_yaw_x" />
   ```
2. **With Pre-filled Data**:
   ```jsx
   <FormEDWYawingX name="y1" defaultValue={{ squareNo: 'SQ-001' }} />
   ```
3. **Scaled UI**:
   ```jsx
   <FormEDWYawingX name="y2" className="scale-90" />
   ```
4. **Inside Grid**:
   ```jsx
   <div className="col-span-2">
     <FormEDWYawingX name="main_yaw" />
   </div>
   ```
5. **With Result Standard**:
   ```jsx
   <FormEDWYawingX name="y_res" std={0.005} />
   ```

---

## 📏 29. `FormHorizontalTableSingleRow`
**Purpose**: A highly versatile single-row horizontal table wrapper for measurements. Supports dynamic length, arrow indicators, and standard validation.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name (stores array). |
| `showArrows` | `boolean` | `false` | Enables arrow UI for tilt/direction. |
| `validateStd` | `boolean` | `false` | Enables validation checks. |
| `standards` | `Array` | `[]` | Standard values/ranges for comparison. |
| `...props` | `any` | `undefined` | Passed to `HorizontalTableSingleRow`. |

### 🧠 Technical Logic
- **Array Monitoring**: Uses `useWatch` to track the entire array of values, allowing for calculations based on the collection of inputs.
- **Navigation Integration**: Passed `registerInput` and `focusCell` hooks for smooth keyboard-driven data entry.
- **Standard Formatting**: Maps the `standards` array to the table's header or reference row if enabled.

### 📝 Code Examples
1. **Basic 5-Point Row**:
   ```jsx
   <FormHorizontalTableSingleRow name="p5_check" cols={5} />
   ```
2. **With Arrow Indicators**:
   ```jsx
   <FormHorizontalTableSingleRow name="p1" showArrows={true} />
   ```
3. **Validated Production Check**:
   ```jsx
   <FormHorizontalTableSingleRow 
     name="q1" 
     validateStd={true} 
     standards={[{ min: 0, max: 0.05 }]} 
   />
   ```
4. **Long Table (20 points)**:
   ```jsx
   <FormHorizontalTableSingleRow name="long_row" cols={20} />
   ```
5. **Custom Labels**:
   ```jsx
   <FormHorizontalTableSingleRow name="labeled" labels={['TOP', 'SIDE']} />
   ```

---

## 🎯 30. `FormInputCheckSTD`
**Purpose**: A precision measurement input field that includes standard labels (Min/Max), units, and an optional "N/A" checkbox.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name for the value. |
| `label` | `string` | `undefined` | Display label for the measurement. |
| `unit` | `string` | `""` | Unit (e.g., `"mm"`, `"μm"`). |
| `minStd` | `number`/`string`| `undefined` | Minimum acceptable value. |
| `maxStd` | `number`/`string`| `undefined` | Maximum acceptable value. |
| `validateStd` | `boolean` | `false` | Enables real-time pass/fail color coding. |
| `showCheckbox` | `boolean` | `false` | Shows a checkbox (e.g., for N/A or confirmed). |
| `checkboxName` | `string` | `"{name}_check"` | RHF field name for the checkbox. |

### 🧠 Technical Logic
- **Standard Visibility**: Displays `minStd` and `maxStd` as reference labels next to the input.
- **Validation Colors**: Automatically changes background/text color if the value is out of range (if `validateStd` is true).
- **Required Logic**: If `required` prop is not explicitly false, RHF will validate it as a mandatory field.

### 📝 Code Examples
1. **Basic Gap Measurement**:
   ```jsx
   <FormInputCheckSTD name="gap" label="GAP" minStd={0.05} maxStd={0.10} unit="mm" />
   ```
2. **With Pass/Fail Validation**:
   ```jsx
   <FormInputCheckSTD name="v1" validateStd={true} minStd={220} maxStd={240} label="Voltage" />
   ```
3. **With Metadata Checkbox**:
   ```jsx
   <FormInputCheckSTD 
     name="torque" 
     label="Torque" 
     showCheckbox={true} 
     checkboxName="torque_confirmed" 
   />
   ```
4. **Custom Width**:
   ```jsx
   <FormInputCheckSTD name="s1" inputWidth="120px" label="Length" />
   ```
5. **Not Required**:
   ```jsx
   <FormInputCheckSTD name="opt" label="Optional" required={false} />
   ```

---

## 🧪 16. `FormEDMCoilTubeCheck`
**Purpose**: A specialized multi-row table for checking Coil "IN" and "OUT" status via `TristateCheckbox` (Pass/Fail/Wait) across multiple axes.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name (stores Nested object structure). |
| `axes` | `Array<Object>` | `[{key: 'x', label: 'x'}, ...]` | Configuration for axis labels and RHF keys. |
| `headerAxis` | `string` | `"Axis"` | Header for the first column. |
| `headerCheck` | `string` | `"Check"` | Header for the second column (Coil type). |
| `headerResult` | `string` | `"ทดสอบด้วยการดึง"` | Header for the checkbox column. |

### 🧠 Technical Logic
- **Nested State**: Stores state as `{ [axisKey]: { in: value, out: value } }`.
- **Tristate Logic**: Instead of boolean, it uses Null/True/False (represented by Tristate UI) to distinguish between unchecked, OK, and NG.
- **Row Spanning**: The "Axis" column uses `rowSpan={2}` to group "IN" and "OUT" rows together visually.

### 📝 Code Examples
1. **Basic 3-Axis Check**:
   ```jsx
   <FormEDMCoilTubeCheck name="p12_coils" />
   ```
2. **Single Axis (Custom Label)**:
   ```jsx
   <FormEDMCoilTubeCheck 
     name="c1" 
     axes={[{ key: 'main', label: 'Main Spindle' }]} 
   />
   ```
3. **Custom Headers**:
   ```jsx
   <FormEDMCoilTubeCheck headerAxis="Part" headerResult="Result" />
   ```
4. **Complex 4th Axis**:
   ```jsx
   <FormEDMCoilTubeCheck 
     name="coils"
     axes={[
       { key: 'x', label: 'X-Axis' },
       { key: 'y', label: 'Y-Axis' },
       { key: 'z', label: 'Z-Axis' },
       { key: 'c', label: 'C-Axis' }
     ]}
   />
   ```
5. **Inside a Modal**:
   ```jsx
   <div className="p-4 bg-white rounded shadow">
     <h4 className="font-bold mb-2">Coil Pull Test</h4>
     <FormEDMCoilTubeCheck name="modal_check" />
   </div>
   ```

---

## 📐 17. `FormEDMLevelCeramic`
**Purpose**: specialized component for checking and displaying the leveling status of EDM ceramic plates.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `defaultValue` | `any` | `undefined` | Initial state. |
| `...props` | `any` | `undefined` | Passed to the underlying `EDMLevelCeramic`. |

### 🧠 Technical Logic
- **Visual Feedback**: Usually renders a layout of the ceramic plate with input fields at corner and center points for leveling values.
- **RHF binding**: Connects complex multi-point leveling data to a single form field.

### 📝 Code Examples
1. **Standard Page 11**:
   ```jsx
   <FormEDMLevelCeramic name="p11_level" />
   ```
2. **With Precision Props**:
   ```jsx
   <FormEDMLevelCeramic name="l1" precision={4} />
   ```
3. **Read-only Review**:
   ```jsx
   <FormEDMLevelCeramic name="rev" readOnly={true} />
   ```
4. **Large Scale**:
   ```jsx
   <FormEDMLevelCeramic name="main" className="transform scale-125" />
   ```
5. **With Validation Rules**:
   ```jsx
   <FormEDMLevelCeramic name="q" rules={{ required: "Leveling data incomplete" }} />
   ```

---

## 🏹 18. `FormEDMTablePitchingX`
**Purpose**: A horizontal measurement table for "Pitching" (tilt) across the X-Axis, featuring inputs with arrow indicators (Right/Left).

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name (stores values as an array). |
| `cols` | `number` | `5` | Number of measurement points. |
| `standards` | `Array<Object>` | `[]` | Array of `{ min, max, arrow }` objects. |
| `showStd` | `boolean` | `false` | If true, shows a reference row for Standards. |
| `validateStd` | `boolean` | `false` | If true, highlights invalid inputs in red. |
| `label` | `string` | `"Pitching"` | Row label text. |

### 🧠 Technical Logic
- **Arrow Interaction**: Uses `InputWithArrow` set to `axis="x"`. Typing a number and then pressing keys can toggle arrow directions (represented by tilt).
- **Navigation**: Custom `onKeyDown` logic allows "Enter" to move the focus to the next cell to the right.
- **Validation**: Uses `validateValue` with `useAbs: true` to check if values (ignoring the arrow direction) fall within the min/max range.

### 📝 Code Examples
1. **Basic 5-Point Check**:
   ```jsx
   <FormEDMTablePitchingX name="p5_pit_x" />
   ```
2. **With Standards Display**:
   ```jsx
   <FormEDMTablePitchingX 
     name="p1" 
     showStd={true} 
     standards={[{ min: -2, max: 2, arrow: '+' }, { min: -1, max: 1 }]} 
   />
   ```
3. **Strict Validation**:
   ```jsx
   <FormEDMTablePitchingX name="q1" validateStd={true} standards={stdsArray} />
   ```
4. **Custom Count (10 points)**:
   ```jsx
   <FormEDMTablePitchingX name="ten_pt" cols={10} />
   ```
5. **Custom Label**:
   ```jsx
   <FormEDMTablePitchingX name="tilt" label="Tilt Angle" />
   ```

---

## 🏹 19. `FormEDMTablePitchingY`
**Purpose**: A vertical measurement table for "Pitching" across the Y-Axis, featuring Up/Down arrow indicators.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name (array state). |
| `rows` | `number` | `5` | Number of measurement points (vertical rows). |
| `standards` | `Array<Object>` | `[]` | Reference standards for each point. |
| `showStd` | `boolean` | `true` | If true, shows the STD column. |
| `validateStd` | `boolean` | `true` | Enables real-time validation checks. |

### 🧠 Technical Logic
- **Vertical Navigation**: "Enter" key moves the focus UP (to the previous row index), matching the physical measurement order in some SOPs.
- **Y-Axis Arrows**: Uses `InputWithArrow` set to `axis="y"` (Up/Down indicators).
- **Dynamic Table**: Built on top of `FormQuickTable` for clean column management.

### 📝 Code Examples
1. **Standard Vertical Pitching**:
   ```jsx
   <FormEDMTablePitchingY name="p6_pit_y" rows={5} />
   ```
2. **Without Standards Column**:
   ```jsx
   <FormEDMTablePitchingY name="simple" showStd={false} />
   ```
3. **Longer Axis (12 points)**:
   ```jsx
   <FormEDMTablePitchingY name="long_axis" rows={12} />
   ```
4. **With Custom Rule Standards**:
   ```jsx
   <FormEDMTablePitchingY name="q2" standards={[{ min: 0, max: 0.005, arrow: '+' }]} />
   ```
5. **Read-only Mode (review)**:
   ```jsx
   <FormEDMTablePitchingY name="res" disabled={true} />
   ```

---

## 🌀 20. `FormEDMTableRollingX`
**Purpose**: A horizontal measurement table for "Rolling" on the X-Axis. Despite being on the X-Axis, it uses Up/Down arrows to track the vertical tilt/roll shift.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name. |
| `cols` | `number` | `5` | Number of measurement columns. |
| `standards` | `Array<Object>` | `[]` | Tilt standards for each point. |
| `showStd` | `boolean` | `false` | Shows a standard reference row. |
| `validateStd` | `boolean` | `false` | Highlights errors in red background. |
| `label` | `string` | `"Rolling"` | Row label. |

### 🧠 Technical Logic
- **Rolling Logic**: Uses `axis="y"` for arrows (Up/Down) even though the table moves horizontally across X, as rolling is defined as height variation per rotation/step.
- **Horizontal Navigation**: "Enter" key moves the focus to the next cell to the Right.
- **Table Overlay**: Renders as a single row (or two if `showStd` is true) within a compact flex/table container.

### 📝 Code Examples
1. **Basic Rolling X**:
   ```jsx
   <FormEDMTableRollingX name="p5_rol_x" />
   ```
2. **With Standard Header**:
   ```jsx
   <FormEDMTableRollingX name="r1" showStd={true} standards={stds} />
   ```
3. **Strict QC Check**:
   ```jsx
   <FormEDMTableRollingX name="qc_r" validateStd={true} standards={stds} />
   ```
4. **Custom Point Count**:
   ```jsx
   <FormEDMTableRollingX name="r_pts" cols={7} />
   ```
5. **Inlined in Sub-tab**:
   ```jsx
   <section>
     <h5>Rolling Measurements</h5>
     <FormEDMTableRollingX name="sub_roll" label="Value" />
   </section>
   ```

---

## 📏 51. `FormTableStraightness`
**Purpose**: Validation wrapper for multi-point straightness measurement tables (Points A and B). Ensures all rows are complete before submission.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `rows` | `number` | **Required** | Number of measurement points. |
| `standards` | `Array` | `undefined` | Array of `{min, max}` objects for validation. |
| `showStd` | `boolean` | `false` | Renders a reference standard column. |
| `validateStd` | `boolean` | `false` | Enables out-of-spec highlighting. |

### 🧠 Technical Logic
- **Full-Set Validation**: Iterates through the captured data points and returns `false` if any A or B cell in the defined `rows` range is empty.
- **Default Initialization**: If no `defaultValue` is provided, it auto-initializes as an array of empty row objects `{a: '', b: ''}`.

### 📝 Code Examples
1. **5-Point Straightness Check**:
   ```jsx
   <FormTableStraightness name="s1" rows={5} />
   ```
2. **With Precision Standards**:
   ```jsx
   <FormTableStraightness 
     name="s2" 
     rows={3} 
     showStd={true} 
     standards={[{ min: 0, max: 0.005 }, ...]} 
   />
   ```
3. **Rigorous Validation**:
   ```jsx
   <FormTableStraightness name="s3" rows={10} validateStd={true} />
   ```
4. **Custom point Suffix**:
   ```jsx
   <FormTableStraightness name="s4" rows={5} suffix="um" />
   ```
5. **Pre-filled Reference**:
   ```jsx
   <FormTableStraightness 
     name="s5" 
     rows={2} 
     defaultValue={[{ a: '0', b: '0' }, { a: '0.001', b: '0.001' }]} 
   />
   ```

---

## ➕ 52. `FormTableXABDIFF`
**Purpose**: specialized horizontal X-axis table that handles two input rows (A and B) and a third row that auto-calculates their Absolute Difference or Sum.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field (Expected shape: `{ a: [], b: [] }`). |
| `cols` | `number` | `9` | Number of horizontal measurement points. |
| `calcType` | `string` | `'sum'` | Calculation logic: `'sum'` (A+B) or `'diff'` (|A-B|). |
| `labelDiff` | `string` | `"A+B"` | Header text for the calculated row. |

### 🧠 Technical Logic
- **Real-time Math**: Uses `useWatch` to monitor Column A and B arrays. Returns a formatted result string (up to 3 decimals, cleaned of trailing zeros).
- **Navigation**: "Enter" key moves RIGHT. At the end of the top row (A), it wraps to the start of the middle row (B).
- **Standard Formatting**: Maps `standards[i]` to the optional STD row with directional arrows (→ for +, ← for -).

### 📝 Code Examples
1. **Summation Mode (A+B)**:
   ```jsx
   <FormTableXABDIFF name="page6.data" calcType="sum" labelDiff="Result A+B" />
   ```
2. **Difference Mode (|A-B|)**:
   ```jsx
   <FormTableXABDIFF name="gear_check" calcType="diff" labelDiff="Deviation" />
   ```
3. **With Standard row**:
   ```jsx
   <FormTableXABDIFF name="test" showStd={true} standards={stds} validateStd={true} />
   ```
4. **Short 5-column scale**:
   ```jsx
   <FormTableXABDIFF name="s1" cols={5} />
   ```
5. **No Visual Arrows**:
   ```jsx
   <FormTableXABDIFF name="n1" useArrow={false} />
   ```

---

## 📍 53. `FormTableXPR` / ## 📍 55. `FormTableYPR`
**Purpose**: specialized tables for Pitch (P) and Rolling (R) checks across X or Y travel, focusing on deviations relative to a reference point.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field (stores `{ p: [], r: [] }`). |
| `cols` | `number` | `3` | Number of measurement points. |
| `referenceCol` | `number` | `1` | Index of the reference point (skipped in "Required" validation). |

### 🧠 Technical Logic
- **Reference Awareness**: Validation ensures all cells are filled *except* for the `referenceCol`, which is assumed to be 0 by SOP definition.
- **Twin Fields**: Simultaneously tracks Pitch (p) and Rolling (r) vectors for each physical point in the grid.

### 📝 Code Examples
1. **Standard 3-point X-Check**:
   ```jsx
   <FormTableXPR name="x_pitch_roll" />
   ```
2. **Vertical 5-point Y-Check**:
   ```jsx
   <FormTableYPR name="y_pitch_roll" cols={5} />
   ```
3. **Custom Reference (Point 0)**:
   ```jsx
   <FormTableXPR name="x1" referenceCol={0} />
   ```
4. **Read-only View**:
   ```jsx
   <FormTableYPR name="history" interactive={false} />
   ```
5. **Inside Machine Geometry Card**:
   ```jsx
   <article className="border p-2">
     <h5>Axis Geometry (Pitch/Roll)</h5>
     <FormTableXPR name="geom" />
   </article>   
   ```

---

## ➖ 54. `FormTableYABDIFF`
**Purpose**: Vertical Y-axis table variation of the A/B comparison component, with integrated calculations and specialized "Enter" key navigation.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `rows` | `number` | `7` | Number of vertical measurement points. |
| `diffMode` | `string` | `'diff'` | `'diff'` (Absolute difference) or `'sum'`. |
| `axis` | `string` | `'y'` | Arrow orientation for inputs. |

### 🧠 Technical Logic
- **SOP Navigation**:
  - Column A: Enter moves focus **UP** (towards Start). Jumps to Top of B on boundary.
  - Column B: Enter moves focus **DOWN**.
- **Auto-Calculated Output**: The DIFF column dynamically renders using an internal `DiffCell` component that watches the parent state.
- **Formatted Standards**: Shows standards as `Max↑ - Min` or `Min↓ - Max` to match professional mechanical checksheet aesthetics.

### 📝 Code Examples
1. **Vertical Deviation Check**:
   ```jsx
   <FormTableYABDIFF name="p3_dev" rows={7} diffMode="diff" />
   ```
2. **Summation Grid**:
   ```jsx
   <FormTableYABDIFF name="total_load" diffMode="sum" labelDiff="Total" />
   ```
3. **With Tolerance Rows**:
   ```jsx
   <FormTableYABDIFF name="audit" showStd={true} standards={yStds} />
   ```
4. **Narrow 3-row layout**:
   ```jsx
   <FormTableYABDIFF name="compact" rows={3} />
   ```
5. **Horizontal Arrows**:
   ```jsx
   <FormTableYABDIFF name="side_rol" axis="x" labelA="Side L" labelB="Side R" />
   ```

---

## 🟥 56. `FormValidatedCell`
**Purpose**: A high-performance table-cell component that combines a `<td>` container with an encapsulated `<input>`. It provides integrated validation styling and keypad support.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `min` | `number` | `undefined` | Minimum tolerance. |
| `max` | `number` | `undefined` | Maximum tolerance. |
| `className` | `string` | `""` | CSS for the `<td>`. |
| `inputClassName`| `string` | `""` | CSS for the `<input>`. |

### 🧠 Technical Logic
- **Dual Visual Feedback**: 
  - Red Border = Required field empty (RHF Error).
  - Red Background = Value out of range (`validateValue` failed).
- **Intelligent Focus**: Detects mobile user agents and automatically blurs the native keyboard in favor of the custom `NumericKeypad`.
- **RHF binding**: Uses the `register` hook directly for high-speed synchronization.

### 📝 Code Examples
1. **Critical Dimension Cell**:
   ```jsx
   <FormValidatedCell name="dim_x" min={10.0} max={10.5} placeholder="X" />
   ```
2. **Inside a Standard Row**:
   ```jsx
   <tr>
     <td>Label</td>
     <FormValidatedCell name="row1" min={0} max={1} />
   </tr>
   ```
3. **Custom Styling**:
   ```jsx
   <FormValidatedCell 
     name="c1" 
     className="w-24 bg-gray-50" 
     inputClassName="font-bold underline" 
   />
   ```
4. **No Keypad (Desktop focus only)**:
   ```jsx
   <FormValidatedCell name="d1" isKeypadEnabled={false} />
   ```
5. **Within Validation Loop**:
   ```jsx
   {items.map(i => (
     <FormValidatedCell key={i.id} name={`check.${i.id}`} min={i.low} max={i.high} />
   ))}
   ```

---

## 🔧 57. `FormWorkstandCheck`
**Purpose**: specialized component for auditing the stability and alignment of workstands across 4 quadrants.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF field name. |
| `defaultValue` | `Object` | `{}` | Initial state. |
| `...props` | `any` | `undefined` | Passed to `WorkstandCheck`. |

### 🧠 Technical Logic
- **Holistic Validation**: Ensures that at least one data point is entered across the four monitored sections (`a`, `b`, `c`, `d`).
- **Data Shape**: Expects a nested object where each key (`a` to `d`) contains points or metrics.

### 📝 Code Examples
1. **Standard Workstand Audit**:
   ```jsx
   <FormWorkstandCheck name="p12_stand" />
   ```
2. **With Custom Header**:
   ```jsx
   <FormWorkstandCheck name="s1" title="Area 4 Stability" />
   ```
3. **Reference data**:
   ```jsx
   <FormWorkstandCheck name="s2" defaultValue={{ a: [0.001], b: [0.002] }} />
   ```
4. **Inside Inspection Container**:
   ```jsx
   <div className="border-4 p-4 border-double">
     <FormWorkstandCheck name="ws_check" />
   </div>
   ```
5. **Condensed View**:
   ```jsx
   <FormWorkstandCheck name="c1" variant="compact" />
   ```

---

## 📐 58. `FormYawingUV` / ## 📐 59. `FormYawingY`
**Purpose**: specialized RHF wrappers for Capturing Yawing (pivoting) errors on specific machine axes.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name. |
| `...props` | `any` | `undefined` | Passed to the underlying Yawing component. |

### 📝 Code Examples
1. **Vertical Axis Yaw**:
   ```jsx
   <FormYawingY name="yaw_y" />
   ```
2. **Twin-Axis Pivot Check**:
   ```jsx
   <FormYawingUV name="yaw_uv" />
   ```
3. **With Standard Reference**:
   ```jsx
   <FormYawingY name="y1" std={0.005} />
   ```
4. **Inside Layout Grid**:
   ```jsx
   <div className="flex">
     <FormYawingY name="left" />
     <FormYawingY name="right" />
   </div>
   ```
5. **Initial Metadata**:
   ```jsx
   <FormYawingUV name="uv1" defaultValue={{ equipmentId: 'L-101' }} />
   ```

---

## 📷 60. `ImageUploadBox`
**Purpose**: A feature-rich image capture component with camera support, live preview, and asynchronous file management.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | RHF name. |
| `apiEndpoint` | `string` | **Required** | Base URL for upload server. |
| `deferred` | `boolean` | `false` | If true, stores the raw `File` object in RHF instead of uploading immediately. |
| `uploadPath` | `string` | `'/upload/assy'` | Server route for POST request. |

### 🧠 Technical Logic
- **State Modes**:
  - **Immediate**: Uploads file on change, receives filename from server, and stores string in RHF.
  - **Deferred**: Stores the JavaScript `File` object in RHF (ideal for batch submission).
- **Preview Logic**: Handles both server URLs (strings) and local object URLs (Blobs/Files) for seamless rendering.
- **Auto-Cleanup**: Automatically cleans the input element after selection, allowing users to re-select the same file if needed.

### 📝 Code Examples
1. **Standard Evidence Capture**:
   ```jsx
   <ImageUploadBox name="prob_img" apiEndpoint="http://api.local" />
   ```
2. **Offline/Deferred upload**:
   ```jsx
   <ImageUploadBox name="temp_img" apiEndpoint="..." deferred={true} />
   ```
3. **Custom Folder Destination**:
   ```jsx
   <ImageUploadBox name="sign" uploadPath="/upload/signatures" label="Sign here" />
   ```
4. **Inlined Square**:
   ```jsx
   <ImageUploadBox name="img1" className="w-32 h-32" />
   ```
5. **Within Form Step**:
   ```jsx
   <section>
     <label>Step 1 Photo</label>
     <ImageUploadBox name="step1_img" apiEndpoint={ENV_URL} />
   </section>
   ```

---

## 🏹 61. `InputWithArrow`
**Purpose**: specialized number input that appends directional arrows (↑ for positive, ↓ for negative) based on axis logic.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `any` | **Required** | Raw number/string value. |
| `axis` | `string` | `'y'` | Influence formatting logic (Y axis uses Up/Down). |
| `showArrows` | `boolean` | `true` | Enables/Disables arrow formatting. |

### 📝 Code Examples
1. **Y-Axis Alignment**:
   ```jsx
   <InputWithArrow value={0.001} axis="y" /> // Output: 1.00↑
   ```
2. **Plain Number Mode**:
   ```jsx
   <InputWithArrow value={10} showArrows={false} /> // Output: 10
   ```
3. **Controlled React Component**:
   ```jsx
   <InputWithArrow value={v} onChange={setV} axis="x" />
   ```
4. **Custom Class**:
   ```jsx
   <InputWithArrow value={v} className="text-blue-600 font-bold" />
   ```
5. **Within Table Cell**:
   ```jsx
   <td>
     <InputWithArrow value={field.v} showArrows={true} />
   </td>
   ```

---

## 🔲 62. `ShapedCheckGroup`
**Purpose**: A complex "Triple-Check" component managing Square (Final), Circle (FG), and Triangle (Double) statuses with integrated image evidence.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | Base field name. |
| `visibleShapes`| `Array` | `[1, 2, 3]` | Indices of shapes to show (1=Sq, 2=Ci, 3=Tr). |
| `showCamera` | `boolean` | `true` | Shows/Hides camera and image management buttons. |

### 🧠 Technical Logic
- **Tristate Cycling**: Clicking a shape cycles through: `null` -> `pass` (✓) -> `fail` (✗) -> `na` (N/A) -> `null`.
- **Compound State**: Registers multiple hidden fields per shape: `{name}_c1_check`, `{name}_c1_image`, etc.
- **Image Resizing**: automatically resizes high-res camera captures to 1200px (JPEG) before uploading to save bandwidth and server space.

### 📝 Code Examples
1. **Full Triple Audit**:
   ```jsx
   <ShapedCheckGroup name="item1" apiEndpoint={ENV} />
   ```
2. **Final & FG Inspection (No Double Check)**:
   ```jsx
   <ShapedCheckGroup name="item2" visibleShapes={[1, 2]} />
   ```
3. **Observation Only (Checks only, no images)**:
   ```jsx
   <ShapedCheckGroup name="obs" showCamera={false} />
   ```
4. **Required Confirmation**:
   ```jsx
   <ShapedCheckGroup name="critical" required={true} />
   ```
5. **Inside a Table Row**:
   ```jsx
   <tr>
     <td>Check Dimension</td>
     <td><ShapedCheckGroup name="row1" /></td>
   </tr>
   ```

---

## 🧮 63. `TableCalculateSetting`
**Purpose**: specialized automation table for Pages requiring complex multipliers and clamped calibration results.

### ⚙️ Prop Details
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `multiplier` | `number` | **Required** | Coefficient for result calculation. |
| `registerPrefix`| `string` | `"p43"` | RHF base path. |
| `maxValueRefIndex`| `number`| `undefined` | Clamps result if it exceeds value at this index. |

### 🧠 Technical Logic
- **Reactive Calc**: Uses `useWatch` to track "Present Setting" inputs. Immediately updates "Calculate New Setting" fields using formula: `Present * Multiplier`.
- **Clamping**: If `maxValueRefIndex` is set, results are capped at that row's input value.
- **Flexible Headers**: Supports custom HTML headers for complex technical labeling.

### 📝 Code Examples
1. **Standard Page 9 Setup**:
   ```jsx
   <TableCalculateSetting multiplier={1.25} registerPrefix="p9" />
   ```
2. **With Static Row Config**:
   ```jsx
   <TableCalculateSetting 
     rowConfig={[{ index: 1, label: "V1", isCalculated: true }]} 
   />
   ```
3. **Clamped to Reference Row**:
   ```jsx
   <TableCalculateSetting maxValueRefIndex={0} multiplier={2} />
   ```
4. **Custom Multipliers per Row**:
   ```jsx
   <TableCalculateSetting rowMultipliers={{ 0: 1.5, 1: 2.0 }} />
   ```
5. **In a Multi-Table View**:
   ```jsx
   <div className="space-y-4">
     <TableCalculateSetting multiplier={1} />
     <TableCalculateSetting multiplier={0.5} />
   </div>
   ```

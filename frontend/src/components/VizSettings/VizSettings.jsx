import React from "react";
// import { SelectField } from "components/inputs";
import styles from "./VizSettings.module.scss";
import { SettingsAccordion } from "./SettingsAccordion/SettingsAccordion";
export const VizSettings = ({
  item,
  questions,
  handleDeleteChart,
  handleChartData,
  index,
}) => {
  //   const [dataLabels, setDataLabels] = useState(
  //     item.design_settings.hasDataLabels
  //   );
  //   const [chartType, setChartType] = useState(item.type);
  // function setDataLabels() {
  //     console.log(props.item.design_settings.hasDataLabels)
  //     props.item.design_settings.hasDataLabels = !props.item.design_settings.hasDataLabels;
  // }
//   const options = [
//     { value: "linechart", label: "Line Chart" },
//     { value: "horizontalbarchart", label: "Horizontal Bar Chart" },
//     { value: "verticalbarchart", label: "Vertical Bar Chart" },
//     { value: "doughnutchart", label: "Doughnut Chart" },
//     { value: "numbercount", label: "Answer Count" },
//   ];

//   const questionOptions = [];
//   questions.map((question) => {
//     let option = { value: question.id, label: question.titleLabel };
//     questionOptions.push(option);
//   });
  // const [quesitonOption, setQuestionOptions] = useState(emptyArray)

  return (
    <div className={styles.settingscontainer}>
      <span className={styles.header}>Chart Design</span>
      {/* <div className={styles.settingwithlabel}>
        <span>Data</span>
        <SelectField
          defaultValue={item.type}
          onChange={(e) => {
            console.log(e);
            handleChartData(e, index);
          }}
          options={questionOptions}
          placeholder="Select..."
        ></SelectField>
      </div>
      <div className={styles.settingwithlabel}>
        <span>Chart Type</span>
        <SelectField
          defaultValue={item.type}
          onChange={(value) => {
            item.type = value;
          }}
          options={options}
          placeholder={item.type}
        ></SelectField>
      </div> */}
      <SettingsAccordion item={item} questions={questions} handleChartData={handleChartData} index={index}></SettingsAccordion>
      <div className={styles.deletechartbox}>
        <button onClick={handleDeleteChart}>Delete Chart</button>
      </div>
    </div>
  );
};

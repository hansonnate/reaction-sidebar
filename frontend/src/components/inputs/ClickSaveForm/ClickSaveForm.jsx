import React from "react";
import styles from "./ClickSaveForm.module.scss";
import { useForm, Controller } from "react-hook-form";
import { UGAccordion } from "components/UGAccordion/UGAccordion";
import AccordionItem from "components/UGAccordion/AccordionItem";
import Checkbox from "../input_fields/CheckboxAnimated/Checkbox";
import { TeamsList } from "components/TeamsList/TeamsList";
import { SelectField } from "../input_fields";

export const Form = ({ onSave, onDelete, onClose, children }) => {
  const { control, handleSubmit, register, setValue, getValues } = useForm();
  // eslint-disable-next-line

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    // handleUpdate(data.name, data.description);
    onSave(data);
  };
  const onRemove = () => {
    onDelete();
    alert("Role has been yeeted");
  };
  const onQuit = () => {
    onClose();
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function fixTextStyle(string) {
    let newString = string.replaceAll("_", " ");
    newString = capitalizeFirstLetter(newString);
    console.log(newString);
    return newString;
  }

  return (
    <div className={styles.formpage}>
      <form>
        <div className={styles.fullform}>
          <div className={styles.formbody}>
            {children.map((item, i) => (
              <div key={i}>
                <div key={i} className={styles.container}>
                  {item.props.type === "text" && (
                    <>
                      {item.props.label && (
                        <label className={styles.inputlabel}>
                          {item.props.label}
                        </label>
                      )}
                      <Controller
                        render={({ field }) => (
                          <item.type
                            {...field}
                            placeholder={item.props.placeholder}
                            className={styles.textinput}
                          ></item.type>
                        )}
                        control={control}
                        // defaultValue="yeh"
                        {...register(`${item.props.name}`)}
                        {...setValue(`${item.props.name}`, item.props.value, {
                          shouldTouch: true,
                        })}
                      />
                    </>
                  )}
                </div>
                {item.props.type === "accordion" && (
                  <UGAccordion>
                    {item.props.data.map((item) => (
                      <AccordionItem key={item.name} item={item}>
                        {Object.keys(item).map((key) => (
                          <>
                            {key !== "name" && (
                              <div key={key} className={styles.item}>
                                <Controller
                                  render={({ field }) => (
                                    <Checkbox
                                      {...field}
                                      checked={getValues(`${key}`)}
                                      // defaultChecked={item[key]}
                                    ></Checkbox>
                                  )}
                                  control={control}
                                  // defaultValue="yeh"
                                  {...register(`${key}`)}
                                  {...setValue(`${key}`, item[key], {
                                    shouldTouch: true,
                                  })}
                                  className="materialUIInput"
                                />
                                <span>{fixTextStyle(key)}</span>
                              </div>
                            )}
                          </>
                        ))}
                      </AccordionItem>
                    ))}
                  </UGAccordion>
                )}
                {item.props.type === "userlist" && (
                  <TeamsList
                    organization_id={item.props.organization_id}
                    columns={item.props.columns}
                    data={item.props.data}
                    title={item.props.title}
                    onSave={item.props.onSave}
                  ></TeamsList>
                )}
                {item.props.type === "select" && (
                  <Controller
                    render={({ field }) => (
                      <SelectField
                        {...field}
                        options={item.props.options}
                        onChange={(value) => ({
                          ...setValue(`${item.props.name}`, value, {
                            shouldTouch: true,
                          }),
                        })}
                      ></SelectField>
                    )}
                    control={control}
                    // defaultValue="yeh"
                    {...register(`${item.props.name}`)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className={styles.submitcontainer}>
            {onClose && (
              <button
                className={styles.submitbutton}
                onClick={handleSubmit(onQuit)}
              >
                Close
              </button>
            )}
            {onDelete && (
              <button
                className={styles.submitbutton}
                onClick={handleSubmit(onRemove)}
              >
                Delete
              </button>
            )}
            {onSave && (
              <button
                className={styles.submitbutton}
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

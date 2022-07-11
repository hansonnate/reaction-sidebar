import React from "react";
import styles from "./ClickSaveForm.module.scss";
import { useForm, Controller } from "react-hook-form";
import { UGAccordion } from "components/UGAccordion/UGAccordion";
import AccordionItem from "components/UGAccordion/AccordionItem";
import Checkbox from "../input_fields/CheckboxAnimated/Checkbox";

export const Form = ({onSave, children }) => {
  const { control, handleSubmit, register, setValue, getValues } = useForm();
  // eslint-disable-next-line

  
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    // handleUpdate(data.name, data.description);
    onSave(data);
  };

  console.log(children);
  return (
    <div className={styles.formpage}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fullform}>
          <div className={styles.formbody}>
            {children.map((item, i) => (
              <div key={i}>
                <div key={i} className={styles.container}>
                  {item.props.type === "text" && (
                    <>
                      <label className={styles.inputlabel}>
                        {item.props.label}
                      </label>
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
                          <div key={key}>
                            {key !== "name" && (
                              <>
                                <Controller
                                  render={({ field }) => (
                                    <Checkbox
                                      {...field}
                                      checked={getValues(`${item.name}_${key}`)}
                                      // defaultChecked={item[key]}
                                    ></Checkbox>
                                  )}
                                  control={control}
                                  // defaultValue="yeh"
                                  {...register(`${item.name}_${key}`)}
                                  {...setValue(
                                    `${item.name}_${key}`,
                                    item[key],
                                    {
                                      shouldTouch: true,
                                    }
                                  )}
                                  className="materialUIInput"
                                />
                                <span>{key}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </AccordionItem>
                    ))}
                  </UGAccordion>
                )}
              </div>
            ))}
          </div>
          <div className={styles.submitcontainer}>
            <input
              type="submit"
              value="Save"
              className={styles.submitbutton}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
};

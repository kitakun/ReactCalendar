import { useEffect } from "react";
// 3rd party
import { Moment } from "moment";
import { Button, DatePicker, Form, Input, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
// local
import { DayPlanModel } from "../../models/DayPlanModel";
import { CreateEventFormData } from "./model";

const TIME_FORMAT = "HH:mm";

interface ICreateEventFormProps {
  selectedDate?: Moment;
  isReadonly?: boolean;
  currentPlan?: DayPlanModel;

  onCreateNewEvent: (newEvent: DayPlanModel) => void;
  setSelectedDate?: (date: Moment) => void;
  onCancel?: () => void;
}

export default function CreateEventForm(props: ICreateEventFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    // listen for date changes from outside
    form.setFieldsValue({
      date: props.selectedDate,
    } as Partial<CreateEventFormData>);
  }, [form, props.selectedDate]);

  useEffect(() => {
    // listen for plane changes from outside
    if (props.currentPlan) {
      form.setFieldsValue(props.currentPlan);
    } else {
      const dateField = form.getFieldValue("date");
      form.resetFields();
      form.setFields([
        {
          name: "date",
          value: dateField,
        },
      ]);
    }
  }, [form, props.currentPlan]);

  const onFinish = (values: DayPlanModel) => {
    props.onCreateNewEvent(values);
  };

  const clearForm = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form
        name="basic"
        disabled={props.isReadonly}
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please input your date!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="From"
          name="from"
          rules={[{ required: true, message: "Please input From time!" }]}
        >
          <TimePicker format={TIME_FORMAT} name="From" />
        </Form.Item>

        <Form.Item
          label="To"
          name="to"
          rules={[{ required: true, message: "Please input To time!" }]}
        >
          <TimePicker format={TIME_FORMAT} name="To" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea disabled={props.isReadonly}></TextArea>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 32 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {props.onCancel && (
            <Button type="primary" htmlType="button" onClick={props.onCancel}>
              Cancel
            </Button>
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 32 }}>
          <Button type="ghost" htmlType="button" onClick={clearForm}>
            Clear
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

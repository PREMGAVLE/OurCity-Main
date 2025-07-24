 export const RegisterForm = [
  {
    form_id: "register_form_step_1",
    title: "Parents Details",
    step: 1,
    formFor: "father",
    layout: "vertical",
    subtab: true,
    skip: true,
    subTabColumn: ["Father (Primary)", "Mother"],
    fields: [
      {
        name: "first_name",
        label: "Full Name",
        placeholder: "Enter full name",
        type: "text",
        component_class: "Input",
        isRequired: false,
        validation: [
          { type: "required", message: "Full name is required" },
          { type: "minLength", value: 3, message: "Name must be at least 3 characters" }
        ]
      },
      {
        name: "email",
        label: "Email Address",
        placeholder: "Enter email",
        type: "email",
        component_class: "Input",
        isRequired: true,
        validation: [
          { type: "required", message: "Email is required" },
          { type: "pattern", value: "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message: "Enter a valid email" }
        ]
      },
      {
        name: "phone",
        label: "Phone Number",
        placeholder: "Enter phone number",
        type: "phone",
        component_class: "PhoneInput",
        isRequired: true,
        validation: [
          { type: "required", message: "Phone number is required" },
          { type: "pattern", value: "^\\d{10}$", message: "Phone number must be 10 digits" }
        ]
      },
      {
        name: "occupation",
        label: "Occupation",
        placeholder: "Select occupation",
        type: "select",
        component_class: "Dropdown",
        isRequired: true,
        validation: [
          { type: "required", message: "Occupation is required" }
        ],
        dropdown_item: [
          { id: 1, name: "Engineer" },
          { id: 2, name: "Doctor" },
          { id: 3, name: "Teacher" }
        ]
      },
      {
        name: "education",
        label: "Education",
        placeholder: "Select education level",
        type: "select",
        component_class: "Dropdown",
        isRequired: true,
        validation: [
          { type: "required", message: "Education is required" }
        ],
        dropdown_item: [
          { id: 1, name: "12th" },
          { id: 2, name: "Graduate" },
          { id: 3, name: "Postgraduate" }
        ]
      },
      {
        name: "address",
        label: "Address",
        placeholder: "Enter address",
        type: "text",
        component_class: "TextArea",
        isRequired: true,
        validation: [
          { type: "required", message: "Address is required" },
          { type: "minLength", value: 10, message: "Address must be at least 10 characters" }
        ]
      }
    ]
  },
  {
    form_id: "register_form_step_2",
    title: "Student Details",
    step: 2,
    layout: "vertical",
    fields: [
      {
        name: "student_name",
        label: "Student Name",
        placeholder: "Enter student name",
        type: "text",
        component_class: "Input",
        isRequired: true,
        validation: [
          { type: "required", message: "Student name is required" },
          { type: "minLength", value: 3, message: "Name must be at least 3 characters" }
        ]
      },
      {
        name: "dob",
        label: "Date of Birth",
        placeholder: "Select date of birth",
        type: "date",
        component_class: "DatePicker",
        isRequired: true,
        validation: [
          { type: "required", message: "Date of birth is required" }
        ]
      },
      {
        name: "gender",
        label: "Gender",
        placeholder: "Select gender",
        type: "radio",
        component_class: "RadioGroup",
        options: ["Male", "Female", "Other"],
        isRequired: true,
        validation: [
          { type: "required", message: "Gender selection is required" }
        ]
      },
      {
        name: "grade",
        label: "Grade Applying For",
        placeholder: "Select grade",
        type: "text",
        component_class: "Dropdown",
        isRequired: true,
        validation: [
          { type: "required", message: "Grade selection is required" }
        ],
        dropdown_item: [
          { id: 1, name: "Nursery" },
          { id: 2, name: "LKG" },
          { id: 3, name: "UKG" }
        ]
      }
    ]
  },
  {
    form_id: "register_form_step_3",
    title: "Registration Fee",
    step: 3,
    layout: "vertical",
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "student_name",
            label: "Student Name",
            placeholder: "Student Name",
            type: "text",
            component_class: "Input",
            readonly: true,
            isRequired: true,
            validation: [
              { type: "required", message: "Please select a Student Name" }
            ]

          },
          {
            name: "registration_no",
            label: "Registration No",
            placeholder: "Registration No",
            type: "text",
            component_class: "Input",
            readonly: true,
            isRequired: false
          }
        ]
      },
      {
        name: "amount",
        label: "Amount to Pay",
        placeholder: "Amount",
        type: "text",
        component_class: "Currency",
        readonly: true,
        isRequired: false
      },
      {
        name: "payment_method",
        label: "Select Payment Method",
        placeholder: "Choose payment method",
        type: "radio",
        component_class: "RadioGroup",
        options: ["Credit /Debit Card", "Net banking", "UPI Payment"],
        isRequired: true,
        validation: [
          { type: "required", message: "Please select a payment method" }
        ]
      },
      {
        name: "email_receipt",
        label: "Send receipt to email",
        type: "checkbox",
        component_class: "Checkbox",
        default: true,
        isRequired: false
      }
    ]
  },
  {
    form_id: "register_form_step_4",
    title: "Confirmation",
    step: 4,
    layout: "vertical",
    fields: [
      {
        name: "terms",
        label: "I agree to the Terms and Conditions",
        type: "checkbox",
        component_class: "Checkbox",
        isRequired: true,
        validation: [
          { type: "required", message: "You must agree to the terms" },
          
        ]
      },
      {
        name: "confirm_details",
        label: "Please confirm the above information is correct.",
        type: "checkbox",
        component_class: "Checkbox",
        isRequired: true,
        validation: [
          { type: "required", message: "Please confirm the information" }
        ]
      }
    ]
  }
];

export const VisitorForm = [
  {
    form_id: "visitor_form_step_1",
    title: "Visitor Information",
    step: 1,
    layout: "vertical",
    fields: [
      { name: "full_name", label: "Full Name", placeholder: "Enter full name", type: "text", component_class: "Input", required: true },
      { name: "email", label: "Email Address", placeholder: "Enter email", type: "email", component_class: "Input", required: true },
      { name: "phone", label: "Phone Number", placeholder: "Enter phone number", type: "phone", component_class: "PhoneInput", required: true },
      { name: "visit_date", label: "Date of Visit", placeholder: "Select visit date", type: "date", component_class: "DatePicker", required: true },
      {
        name: "visit_reason",
        label: "Reason for Visit",
        placeholder: "Select reason",
        type: "select",
        component_class: "Dropdown",
        required: true,
        dropdown_item: [
          { id: 1, name: "Inquiry" },
          { id: 2, name: "Tour" },
          { id: 3, name: "Meeting" }
        ]
      }
    ]
  },
  {
    form_id: "visitor_form_step_2",
    title: "Visit Preferences",
    step: 2,
    layout: "vertical",
    fields: [
      {
        name: "preferred_contact",
        label: "Preferred Contact Method",
        placeholder: "Select contact method",
        type: "radio",
        component_class: "RadioGroup",
        required: true,
        options: ["Email", "Phone", "In-Person"]
      },
      {
        name: "subscribe_newsletter",
        label: "Subscribe to newsletter",
        type: "checkbox",
        component_class: "Checkbox",
        default: false
      },
      {
        name: "special_requirements",
        label: "Any special requirements",
        placeholder: "Enter special requirements",
        type: "text",
        component_class: "TextArea",
        required: false
      }
    ]
  },
  {
    form_id: "visitor_form_step_3",
    title: "Confirmation",
    step: 3,
    layout: "vertical",
    fields: [
      {
        name: "consent",
        label: "I consent to be contacted for follow-ups",
        type: "checkbox",
        component_class: "Checkbox",
        required: true
      },
      {
        name: "confirm_details",
        label: "I confirm the information provided is accurate",
        type: "checkbox",
        component_class: "Checkbox",
        required: true
      }
    ]
  }
];

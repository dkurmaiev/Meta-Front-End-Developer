import React, {useEffect} from "react"; 
import { useFormik } from "formik"; 
import { 
 Box, 
 Button, 
 FormControl, 
 FormErrorMessage, 
 FormLabel, 
 Heading, 
 Input, 
 Select, 
 Textarea, 
 VStack, 
} from "@chakra-ui/react"; 
import * as Yup from 'yup'; 
import FullScreenSection from "./FullScreenSection"; 
import useSubmit from "../hooks/useSubmit"; 
import {useAlertContext} from "../context/alertContext"; 
 
/** 
* Covers a complete form implementation using formik and yup for validation 
*/ 
const ContactMeSection = () => { 
 const {isLoading, response, submit} = useSubmit(); 
 const { onOpen } = useAlertContext(); 
 
 const formik = useFormik({ 
   initialValues: { 
     firstName: "", 
     email: "", 
     type: "hireMe", 
     comment: "", 
   }, 
   onSubmit: (values) => { 
     submit('https://john.com/contactme', values); 
   }, 
   validationSchema: Yup.object({ 
     firstName: Yup.string().min(2, "Must be at least 2 characters").required("Required"), 
     email: Yup.string().email("Invalid email address").required("Required"), 
     comment: Yup.string() 
       .min(25, "Must be at least 25 characters") 
       .required("Required"), 
   }), 
 }); 
 
 useEffect(() => { 
   if (response) { 
     onOpen(response.type, response.message); 
     if (response.type === 'success') { 
       formik.resetForm(); 
     } 
   } 
 }, [response]); 
 
 return ( 
   <FullScreenSection 
     isDarkBackground 
     backgroundColor="#512DA8" 
     py={16} 
     spacing={8} 
   > 
     <VStack w="1024px" p={32} alignItems="flex-start"> 
       <Heading as="h1" id="contactme-section"> 
         Contact me 
       </Heading> 
       <Box p={6} rounded="md" w="100%"> 
         <form onSubmit={formik.handleSubmit}> 
           <VStack spacing={4}>
             {/* Show the error messages for each field when the field is touched and the validation fails */}
             <FormControl isInvalid={!!formik.errors.firstName && formik.touched.firstName}> 
               <FormLabel htmlFor="firstName">Name</FormLabel> 
               <Input 
                 id="firstName" 
                 name="firstName" 
                 {...formik.getFieldProps("firstName")} // Make the Input components from Chakra UI controlled components
               />
                {/* Show the error messages for each field when the field is touched and the validation fails */}
               <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage> 
             </FormControl>
             {/* Show the error messages for each field when the field is touched and the validation fails */}
             <FormControl isInvalid={!!formik.errors.email && formik.touched.email}> 
               <FormLabel htmlFor="email">Email Address</FormLabel> 
               <Input 
                 id="email" 
                 name="email" 
                 type="email" 
                 {...formik.getFieldProps("email")} 
               /> 
               <FormErrorMessage>{formik.errors.email}</FormErrorMessage> 
             </FormControl>
             {/* Show the error messages for each field when the field is touched and the validation fails */}
             <FormControl> 
               <FormLabel htmlFor="type">Type of enquiry</FormLabel> 
               <Select id="type" name="type" {...formik.getFieldProps("type")}> 
                 <option value="hireMe">Freelance project proposal</option> 
                 <option value="openSource"> 
                   Open source consultancy session 
                 </option> 
                 <option value="other">Other</option> 
               </Select> 
             </FormControl>
             {/* Show the error messages for each field when the field is touched and the validation fails */}
             <FormControl isInvalid={!!formik.errors.comment && formik.touched.comment}> 
               <FormLabel htmlFor="comment">Your message</FormLabel> 
               <Textarea 
                 id="comment" 
                 name="comment" 
                 height={250} 
                 {...formik.getFieldProps("comment")} 
               /> 
               <FormErrorMessage>{formik.errors.comment}</FormErrorMessage> 
             </FormControl>
             {/* Show a loading indicator */}
             <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}> 
               Submit 
             </Button> 
           </VStack> 
         </form> 
       </Box> 
     </VStack> 
   </FullScreenSection> 
 ); 
}; 
 
export default ContactMeSection;
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { CreateContactDialog } from '../components/CreateContactDialog/CreateContactDialog';
import { ContactDetailsSection } from '../components/ContactDetailsSection/ContactDetailsSection';

export default function Example() {
  const [openCreateContactDialog, setOpenCreateContactDialog] = useState(false);

  return (
    <div>
      <CreateContactDialog
        openCreateContactDialog={openCreateContactDialog}
        setOpenCreateContactDialog={setOpenCreateContactDialog}
      />
      <Sidebar setOpenCreateContactDialog={setOpenCreateContactDialog} />

      <ContactDetailsSection />
    </div>
  );
}

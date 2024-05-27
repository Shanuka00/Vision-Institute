import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function LogoutReg() {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        navigate('/');
      }, [navigate]);

    const cancelLogout = useCallback(() => {
        navigate('/reg_waiting');
        window.location.reload();
      }, [navigate]);

    useEffect(() => {
        const showConfirmation = () => {
          Swal.fire({
              title: 'Are you sure you want to logout?',
              text: 'You are about logout from the system.',
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, logout!'
          }).then(async (result) => {
              if (result.isConfirmed) {
                  try {
                      handleLogout();
                  } catch (error) {
                    console.error(error);
                  }
              }
          });
        };
    
        showConfirmation();
    
        // Add event listener for the cancel button
        Swal.getCancelButton().addEventListener('click', () => {
          cancelLogout();
        });
    }, [handleLogout, cancelLogout]);
}

export default LogoutReg

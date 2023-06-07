'use client';
import EmployeeTable from '@/components/employee-table';
import  styles from './page.module.css'

export default function Home() {
    console.log(styles);
    return (
        <>
            <header className={styles['header-main']}>
                <nav className="flex justify-between">
                    <div className="m-2">
                        <p>EmployeeTracker</p>
                    </div>
                    <ul id='ul1' className="flex">
                        <li className='m-2'><a href="/">Home</a></li>
                        <li className='m-2'><a href="/about">About</a></li>
                        <li className='m-2'><a href="/services">Services</a></li>
                        <li className='m-2'><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
                <section>
                    <div>
                        <EmployeeTable></EmployeeTable>
                    </div>
                </section>
            </header>
        </>
    )
}

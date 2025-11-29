import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create a school
    const school = await prisma.school.create({
        data: {
            name: 'Demo High School',
            address: '123 Education Street',
            phone: '+1-555-0100',
            email: 'admin@demoschool.edu',
        },
    })
    console.log('✅ Created school:', school.name)

    // Create a school admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@demo.com',
            password: hashedPassword,
            name: 'Admin User',
            role: 'SCHOOL_ADMIN',
            schoolAdmin: {
                create: {
                    schoolId: school.id,
                },
            },
        },
    })
    console.log('✅ Created admin user:', adminUser.email)

    // Create a teacher user
    const teacherUser = await prisma.user.create({
        data: {
            email: 'teacher@demo.com',
            password: hashedPassword,
            name: 'Teacher User',
            role: 'TEACHER',
            teacher: {
                create: {
                    schoolId: school.id,
                    subjects: ['Mathematics', 'Science'],
                },
            },
        },
    })
    console.log('✅ Created teacher user:', teacherUser.email)

    // Create a class
    const class1 = await prisma.class.create({
        data: {
            grade: '10',
            section: 'A',
            schoolId: school.id,
        },
    })
    console.log('✅ Created class:', `${class1.grade}-${class1.section}`)

    // Create a student user
    const studentUser = await prisma.user.create({
        data: {
            email: 'student@demo.com',
            password: hashedPassword,
            name: 'Student User',
            role: 'STUDENT',
            student: {
                create: {
                    classId: class1.id,
                    rollNumber: '001',
                },
            },
        },
    })
    console.log('✅ Created student user:', studentUser.email)

    // Create some events
    await prisma.event.createMany({
        data: [
            {
                title: 'Annual Sports Day',
                description: 'School-wide sports competition',
                date: new Date('2025-12-15'),
                type: 'ANNUAL_EVENT',
                schoolId: school.id,
            },
            {
                title: 'Community Clean-up Drive',
                description: 'Community service project',
                date: new Date('2025-12-01'),
                type: 'COMMUNITY_PROJECT',
                schoolId: school.id,
            },
        ],
    })
    console.log('✅ Created 2 events')

    console.log('\n🎉 Seeding completed!')
    console.log('\n📝 Test Credentials:')
    console.log('   Admin:   admin@demo.com / admin123')
    console.log('   Teacher: teacher@demo.com / admin123')
    console.log('   Student: student@demo.com / admin123')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

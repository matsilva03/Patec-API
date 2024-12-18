import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserSubjectDto {
  @IsNotEmpty({ message: 'User ID is required.' })
  userId: number

  @ApiProperty({
    description: 'The unique ID of the subject',
    example: 'MAT001',
  })
  @IsNotEmpty({ message: 'Subject ID is required.' })
  subjectId: string

  @ApiProperty({
    description: 'The RA (Registro Acadêmico) of the user',
    example: '1234567890123',
  })
  @IsNotEmpty({ message: 'User RA is required.' })
  userRa: string
}

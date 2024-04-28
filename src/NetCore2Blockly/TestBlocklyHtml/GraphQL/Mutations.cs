﻿using GraphQL;
using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestBlocklyHtml.DB;

namespace TestBlocklyHtml.GraphQL
{
    public class Mutations : ObjectGraphType
    {
        /*
         * A mutation in GrpahQL means that we are adgin data or modifying it.
         */
        public Mutations(DepartmentRepository departmentRepository)
        {
            //TODO : graphql

            //Use the same OGT
            Field<DepartmentOGT>(
                "createDepartment",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<DepartmentInputType>> { Name = "department" }),
                resolve: context =>
                {
                    var department = context.GetArgument<Department>("department");
                    return departmentRepository.AddDepartment(department);
                }
                );
        }
    }
}

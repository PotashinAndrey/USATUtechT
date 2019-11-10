using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp2
{
    interface IModel
    {
        void AddNode(int value);
        void RemoveLastNode();
        int Count { get; }
    }
}

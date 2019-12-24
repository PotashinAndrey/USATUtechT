using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prog_lab3
{
      interface IModel
    {

        event Action Changed;
        void AddNode(int value);
        void RemoveLastNode();

        IEnumerable<Node> AllNodes { get; }
        int Count { get; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp1
{
    public interface IModel
    {
        event Action Changed;
        void AddNode(int value);
        void RemoveLastNode();
        int Count { get; }
        IEnumerable<Node> AllNodes { get; }
    }
}

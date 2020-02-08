using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp1
{
    public class MyModel : IModel
    {
        LinkedList<Node> nodes = new LinkedList<Node>();
        public int Count => nodes.Count;

        public event Action Changed;
        public IEnumerable<Node> AllNodes => nodes;

        public void AddNode(int value)
        {
            nodes.AddFirst(new Node(value, r.Next(10), r.Next(10)));
            if (Changed != null) Changed();
        }

        public void RemoveLastNode()
        {
            if (nodes.Count > 0) nodes.RemoveLast();
            if (Changed != null) Changed();
        }

        static Random r = new Random();

    }
}
